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
    router.route('/stripe/products').get(authentication, stripeCtrl.listProducts);
    router.route('/stripe/plans').get(authentication, stripeCtrl.listPlans);
    router
        .route('/stripe/create_order')
        .post(authentication, stripeCtrl.createOrder);
    router
        .route('/stripe/create_pay_order/:item_id')
        .post(authentication, stripeCtrl.createAndPayOrder);
    router
        .route('/stripe/make_payment/:item_id')
        .post(authentication, stripeCtrl.makeStripePayment);
}
exports.default = stripeRoutes;
//# sourceMappingURL=stripeRoutes.js.map