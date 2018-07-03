"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Stripe = require("stripe");
function StripeController(models, ResponseService) {
    var stripe = new Stripe(process.env.STRIPE_KEY);
    stripe.setApiVersion('2018-02-06');
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
    function listOrders(req, res) {
        stripe.orders
            .list({ status: 'create' })
            .then(function (orders) {
            ResponseService.success(res, orders);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    function retrieveOrder(req, res) {
        stripe.orders
            .retrieve(req.params.order_id)
            .then(function (newOrder) {
            ResponseService.success(res, newOrder);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    function updateOrder(req, res) {
        var metadata = ResponseService.getItemFromBody(req);
        stripe.orders
            .update(req.params.order_id, metadata)
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
            .retrieve(req.params.order_id)
            .then(function (order) {
            var status = order.metadata.status;
            if (status === 'pending' || status === 'paid') {
                ResponseService.exception(res, status);
            }
            else {
                return createCharge(req, res, order, source);
            }
        })
            .then(function (charge) {
            ResponseService.success(res, charge);
        })
            .catch(function (err) {
            ResponseService.exception(res, err);
        });
    }
    function createCharge(req, res, newOrder, source) {
        var _this = this;
        var Game = models.Game;
        var status = newOrder.metadata.status;
        return stripe.charges
            .create({
            source: source,
            amount: newOrder.amount,
            currency: newOrder.currency,
            receipt_email: newOrder.email
        })
            .then(function (charge) {
            var status = '';
            var metadata = {};
            if (charge && charge.status === 'succeeded') {
                status = 'paid';
                metadata['charge_id'] = charge.id;
            }
            else if (charge) {
                status = charge.status;
                metadata['charge_id'] = charge.id;
            }
            else {
                status = 'failed';
            }
            metadata = Object.assign(newOrder.metadata, {
                status: status
            }, metadata);
            return _this.stripe
                .updataOrder(newOrder.id, metadata)
                .then(function () {
                return Game.update(newOrder.metadata.reference_id, metadata);
            })
                .then(function () {
                ResponseService.success(res, newOrder);
            });
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
            metadata: order.metadata
        })
            .then(function (newOrder) {
            var status = newOrder.metadata.status;
            if (status === 'pending' || status === 'paid') {
                ResponseService.exception(res, status);
            }
            else {
                return createCharge(req, res, newOrder, obj.source);
            }
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
        makeStripePayment: makeStripePayment,
        listOrders: listOrders,
        retrieveOrder: retrieveOrder,
        updateOrder: updateOrder
    };
}
exports.default = StripeController;
//# sourceMappingURL=stripeController.js.map