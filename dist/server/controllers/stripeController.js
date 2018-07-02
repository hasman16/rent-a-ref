"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Stripe = require("stripe");
function StripeController(models, ResponseService) {
    var stripe = new Stripe(process.env.STRIPE_KEY);
    function listProducts(req, res) {
        stripe.products
            .list({ limit: 10 })
            .then(function (products) { return ResponseService.success(res, products); })
            .catch(function (err) { return ResponseService.exception(res, err); });
    }
    function listPlans(req, res) {
        stripe.plans
            .list({ limit: 10 })
            .then(function (plans) { return ResponseService.success(res, plans); })
            .catch(function (err) { return ResponseService.exception(res, err); });
    }
    function matchProductsAndPlans(products, plans) {
        return _.map(plans, function (plan) {
            var product = _.find(products, function (product) {
                return product.id === plan.product;
            });
            return {
                product: product,
                plan: plan
            };
        });
    }
    function listProductsAndPlans(req, res) {
        var products = [];
        stripe.products
            .list({ limit: 10 })
            .then(function (newProducts) {
            products = newProducts.data;
            return stripe.plans.list({ limit: 10 });
        })
            .then(function (newPlans) {
            var plans = newPlans.data;
            var productPlan = matchProductsAndPlans(products, plans);
            ResponseService.success(res, productPlan);
        })
            .catch(function (err) { return ResponseService.exception(res, err); });
    }
    function createOrder(req, res) {
        var order = ResponseService.getItemFromBody(req);
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
            .then(function (newOrder) {
            ResponseService.success(res, newOrder);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    function makeStripePayment(req, res) {
        var source = ResponseService.getItemFromBody(req);
        stripe.orders
            .retrive(req.params.order_id)
            .then(function (order) {
            var status = order.metadata.status;
            if (status === 'pending' || status === 'paid') {
                ResponseService.exception(res, status);
            }
            else {
                return stripe.charges.create({
                    source: source.id,
                    amount: order.amount,
                    currency: order.currency,
                    receipt_email: order.email
                });
            }
        })
            .then(function (charge) {
            ResponseService.success(res, charge);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    function createAndPayOrder(req, res) {
        var obj = ResponseService.getItemFromBody(req);
        var order = obj.order;
        var source = obj.source;
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
            .then(function (newOrder) {
            var status = newOrder.metadata.status;
            if (status === 'pending' || status === 'paid') {
                ResponseService.exception(res, status);
            }
            else {
                return stripe.charges.create({
                    source: source.id,
                    amount: newOrder.amount,
                    currency: newOrder.currency,
                    receipt_email: newOrder.email
                });
            }
        })
            .then(function (charge) {
            ResponseService.success(res, charge);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    return {
        createOrder: createOrder,
        createAndPayOrder: createAndPayOrder,
        listPlans: listPlans,
        listProducts: listProducts,
        listProductsAndPlans: listProductsAndPlans,
        makeStripePayment: makeStripePayment
    };
}
exports.default = StripeController;
//# sourceMappingURL=stripeController.js.map