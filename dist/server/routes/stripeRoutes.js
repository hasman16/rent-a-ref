"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stripeRoutes(setter, stripeCtrl) {
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var isUserOrAdmin = authorization.isUserOrAdmin;
    var isAdmin = authorization.isAdmin;
    var isOrgOwner = authorization.isOrgOwner;
    var isOrgMember = authorization.isOrgMember;
    var imageUploader = setter.imageUploader;
    var isUser = authorization.isUser;
    router.route('/stripe/products').get(authentication, stripeCtrl.listProducts);
    router.route('/stripe/plans').get(authentication, stripeCtrl.listPlans);
    router
        .route('/stripe/products_and_plans')
        .get(authentication, stripeCtrl.listProductsAndPlans);
    router
        .route('/stripe/create_order')
        .post(authentication, stripeCtrl.createOrder);
    router
        .route('/stripe/retrieve_order/:order_id')
        .get(authentication, stripeCtrl.retrieveOrder);
    router
        .route('/stripe/list_orders')
        .get(authentication, stripeCtrl.listOrders);
    router
        .route('/stripe/update_order/:order_id')
        .put(authentication, stripeCtrl.updateOrder);
    router
        .route('/stripe/update_order/:order_id')
        .patch(authentication, stripeCtrl.updateOrder);
    router
        .route('/stripe/create_pay_order')
        .post(authentication, stripeCtrl.createAndPayOrder);
    router
        .route('/stripe/make_payment/:order_id')
        .post(authentication, stripeCtrl.makeStripePayment);
    router
        .route('/stripe/customer/:user_id')
        .get(authentication, isUser, stripeCtrl.retrieveOrCreateCustomer);
}
exports.default = stripeRoutes;
//# sourceMappingURL=stripeRoutes.js.map