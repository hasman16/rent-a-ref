"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
            .update(req.params.order_id, {
            metadata: metadata
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
        return __awaiter(this, void 0, void 0, function () {
            var Game, status;
            return __generator(this, function (_a) {
                Game = models.Game;
                status = newOrder.metadata.status;
                return [2 /*return*/, stripe.charges
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
                        return stripe.orders
                            .update(newOrder.id, {
                            metadata: metadata
                        })
                            .then(function (result1) {
                            return Game.update(metadata, {
                                where: {
                                    id: newOrder.metadata.reference_id
                                }
                            });
                        })
                            .then(function (result2) {
                            ResponseService.success(res, result2);
                        });
                    })];
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