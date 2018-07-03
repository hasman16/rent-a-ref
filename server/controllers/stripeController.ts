import * as _ from 'lodash';
import * as Stripe from 'stripe';
import { OrderModel } from './../types/index';

export default function StripeController(models, ResponseService) {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  stripe.setApiVersion('2018-02-06');
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
      .update(req.params.order_id, metadata)
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

  function createCharge(req, res, newOrder, source) {
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

        return this.stripe
          .updataOrder(newOrder.id, metadata)
          .then(() => {
            return Game.update(newOrder.metadata.reference_id, metadata);
          })
          .then(() => {
            ResponseService.success(res, newOrder);
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
