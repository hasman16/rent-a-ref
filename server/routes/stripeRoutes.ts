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
    .route('/stripe/create_order')
    .post(authentication, stripeCtrl.createOrder);

  router
    .route('/stripe/create_pay_order/:item_id')
    .post(authentication, stripeCtrl.createAndPayOrder);

  router
    .route('/stripe/make_payment/:item_id')
    .post(authentication, stripeCtrl.makeStripePayment);
}
