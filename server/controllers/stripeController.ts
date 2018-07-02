import * as _ from 'lodash';
import * as Stripe from 'stripe';
import { OrderModel } from './../types/index';

export default function StripeController(models, ResponseService) {
  const stripe = new Stripe(process.env.STRIPE_KEY);

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

  function makeStripePayment(req, res) {
    const source = ResponseService.getItemFromBody(req);

    stripe.orders
      .retrive(req.params.order_id)
      .then((order: OrderModel) => {
        const status: string = order.metadata.status;
        if (status === 'pending' || status === 'paid') {
          ResponseService.exception(res, status);
        } else {
          return stripe.charges.create({
            source: source.id,
            amount: order.amount,
            currency: order.currency,
            receipt_email: order.email
          });
        }
      })
      .then(charge => {
        ResponseService.success(res, charge);
      })
      .catch(err => {
        ResponseService.exception(res, err);
      });
  }

  function createAndPayOrder(req, res) {
    const obj = ResponseService.getItemFromBody(req);
    const order: OrderModel = obj.order;
    let source = obj.source;

    if (source.type === 'card' && !source.livemode) {
      source.id = 'tok_visa';
    }
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
      .then((newOrder: OrderModel) => {
        const status: string = newOrder.metadata.status;
        if (status === 'pending' || status === 'paid') {
          ResponseService.exception(res, status);
        } else {
          return stripe.charges.create({
            source: source.id,
            amount: newOrder.amount,
            currency: newOrder.currency,
            receipt_email: newOrder.email
          });
        }
      })
      .then(charge => {
        ResponseService.success(res, charge);
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
    makeStripePayment
  };
}
