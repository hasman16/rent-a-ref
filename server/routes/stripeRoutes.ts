export default function stripeRoutes(setter, stripeCtrl) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const isOrgOwner = authorization.isOrgOwner;
  const isOrgMember = authorization.isOrgMember;
  const imageUploader = setter.imageUploader;

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
}
