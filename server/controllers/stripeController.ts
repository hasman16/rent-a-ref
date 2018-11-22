import * as _ from 'lodash';
import * as Stripe from 'stripe';
import { OrderModel } from './../types/index';

export default function StripeController(models, ResponseService) {
  const sequelize = models.sequelize;
  const stripe = new Stripe(process.env.STRIPE_KEY);
  stripe.setApiVersion('2018-02-06');

  async function retrieveOrCreateCustomer(req, res) {
    const User = models.User;
    const Customer = models.Customer;
    const user_id = req.params.user_id;
    let transaction, stripeCustomer;
    try {
      transaction = await sequelize.transaction();

      const user = await User.findOne(
        {
          where: {
            id: user_id
          }
        },
        { transaction }
      );
      let customer = await Customer.findOne(
        {
          where: {
            email: user.email
          }
        },
        { transaction }
      );

      if (customer && customer.stripe_id) {
        stripeCustomer = await stripe.customers.retrieve(customer.stripe_id);
      } else {
        const stripeCustomers = await stripe.customers.list({
          email: user.email
        });

        if (
          stripeCustomers &&
          stripeCustomers.data &&
          _.isArray(stripeCustomers.data) &&
          stripeCustomers.data.length > 0
        ) {
          stripeCustomer = _.head(stripeCustomers.data);
        } else {
          stripeCustomer = await stripe.customers.create({
            email: user.email
          });
        }

        customer = await Customer.create(
          {
            email: user.email,
            stripe_id: stripeCustomer.id
          },
          { transaction }
        );
      }

      await transaction.commit();
      ResponseService.success(res, stripeCustomer);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
  }

  async function createCard(req, res) {
    const User = models.User;
    const Customer = models.Customer;
    const card = ResponseService.getItemFromBody(req);
    const user_id = req.params.user_id;

    let transaction, stripeCustomer;

    try {
      transaction = await sequelize.transaction();

      const user = await User.findOne(
        {
          where: {
            id: user_id
          }
        },
        { transaction }
      );
      const customer = await Customer.findOne(
        {
          where: {
            email: user.email
          }
        },
        { transaction }
      );
      const stripeCustomer = await stripe.customers.retrieve(
        customer.stripe_id
      );
      if (!stripeCustomer) {
        throw new Error('Unable to retrieve Customer.');
      }
      //const newCare = await stripe.customers.

      await transaction.commit();
      ResponseService.success(res, stripeCustomer);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
  }

  function listProducts(req, res) {
    stripe.products
      .list({ limit: 10 })
      .then(products => ResponseService.success(res, products))
      .catch(err => ResponseService.exception(res, err));
  }

  function listPlans(req, res) {
    stripe.plans
      .list({ limit: 10 })
      .then(plans => ResponseService.success(res, plans))
      .catch(err => ResponseService.exception(res, err));
  }

  function matchProductsAndPlans(products, plans) {
    return _.map(plans, plan => {
      let product = _.find(products, product => {
        return product.id === plan.product;
      });
      return {
        product,
        plan
      };
    });
  }

  function listProductsAndPlans(req, res) {
    let products = [];
    stripe.products
      .list({ limit: 10 })
      .then(newProducts => {
        products = newProducts.data;
        return stripe.plans.list({ limit: 10 });
      })
      .then(newPlans => {
        const plans = newPlans.data;
        const productPlan = matchProductsAndPlans(products, plans);
        ResponseService.success(res, productPlan);
      })
      .catch(err => ResponseService.exception(res, err));
  }

  function createOrder(req, res) {
    const order: OrderModel = ResponseService.getItemFromBody(req);
    // Charge the user's card:
    stripe.orders
      .create({
        currency: order.currency,
        items: order.items,
        email: order.email,
        shipping: order.shipping,
        metadata: {
          status: 'created'
        }
      })
      .then(newOrder => {
        ResponseService.success(res, newOrder);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  function listOrders(req, res) {
    stripe.orders
      .list({ status: 'create' })
      .then(orders => {
        ResponseService.success(res, orders);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  function retrieveOrder(req, res) {
    stripe.orders
      .retrieve(req.params.order_id)
      .then(newOrder => {
        ResponseService.success(res, newOrder);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  function updateOrder(req, res) {
    const metadata = ResponseService.getItemFromBody(req);

    stripe.orders
      .update(req.params.order_id, {
        metadata
      })
      .then(newOrder => {
        ResponseService.success(res, newOrder);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  function makeStripePayment(req, res) {
    const source = ResponseService.getItemFromBody(req);

    stripe.orders
      .retrieve(req.params.order_id)
      .then((order: OrderModel) => {
        const status: string = order.metadata.status;
        if (status === 'pending' || status === 'paid') {
          ResponseService.exception(res, status);
        } else {
          return createCharge(req, res, order, source);
        }
      })
      .then(charge => {
        ResponseService.success(res, charge);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  async function createCharge(req, res, newOrder, source) {
    const Game = models.Game;
    const status: string = newOrder.metadata.status;

    return stripe.charges
      .create({
        source: source,
        amount: newOrder.amount,
        currency: newOrder.currency,
        receipt_email: newOrder.email
      })
      .then(charge => {
        let status = '';
        let metadata = {};
        if (charge && charge.status === 'succeeded') {
          status = 'paid';
          metadata['charge_id'] = charge.id;
        } else if (charge) {
          status = charge.status;
          metadata['charge_id'] = charge.id;
        } else {
          status = 'failed';
        }
        metadata = Object.assign(
          newOrder.metadata,
          {
            status
          },
          metadata
        );
        return stripe.orders
          .update(newOrder.id, {
            metadata
          })
          .then(result1 => {
            return Game.update(metadata, {
              where: {
                id: newOrder.metadata.reference_id
              }
            });
          })
          .then(result2 => {
            ResponseService.success(res, result2);
          });
      });
  }

  function createAndPayOrder(req, res) {
    const obj = ResponseService.getItemFromBody(req);
    const order: OrderModel = obj.order;
    let source = obj.source;

    // Charge the user's card:
    stripe.orders
      .create({
        currency: order.currency,
        items: order.items,
        email: order.email,
        shipping: order.shipping,
        metadata: order.metadata
      })
      .then((newOrder: OrderModel) => {
        const status: string = newOrder.metadata.status;
        if (status === 'pending' || status === 'paid') {
          ResponseService.exception(res, status);
        } else {
          return createCharge(req, res, newOrder, obj.source);
        }
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  return {
    retrieveOrCreateCustomer,
    createOrder,
    createAndPayOrder,
    listPlans,
    listProducts,
    listProductsAndPlans,
    makeStripePayment,
    listOrders,
    retrieveOrder,
    updateOrder
  };
}
