export default function userRoutes(setter, ctrls) {
  const router = setter.router;
  const authentication = setter.authentication;
  const authorization = setter.authorization;
  const imageUploader = setter.imageUploader;

  const isUserOrAdmin = authorization.isUserOrAdmin;
  const isAdmin = authorization.isAdmin;
  const isUser = authorization.isUser;
  const userCtrl = ctrls.userCtrl;
  const loginCtrl = ctrls.loginCtrl;
  const passwordCtrl = ctrls.passwordCtrl;
  const registerCtrl = ctrls.registerCtrl;

  router.route('/login').post(loginCtrl.login);
  router.route('/logout').post(userCtrl.logout);

  router.route('/users').get(authentication, isAdmin, userCtrl.getAll);

  router.route('/users').post(registerCtrl.registerUser);
  router.route('/register').post(registerCtrl.registerUser);

  router.use('/profile/:user_id', authentication, isUser);
  router.route('/profile/:user_id').get(registerCtrl.getProfile);
  //router.route('/profile/:user_id').get(authentication, isUser,registerCtrl.getProfile);

  router
    .route('/changepassword/:user_id')
    .put(authentication, isUser, passwordCtrl.changepassword);
  router
    .route('/changepassword/:user_id')
    .patch(authentication, isUser, passwordCtrl.changepassword);

  router.route('/forgotpassword').post(passwordCtrl.forgotpassword);
  router.route('/resetpassword').post(passwordCtrl.resetpassword);

  router.use('/users/:user_id', authentication, isUserOrAdmin);
  router.route('/users/:user_id').get(userCtrl.getOne);
  router.route('/users/:user_id').put(userCtrl.update);
  router.route('/users/:user_id').patch(userCtrl.update);
  router.route('/users/:user_id').delete(userCtrl.deleteOne);

  router
    .route('/upload_image/:user_id')
    .post(authentication, imageUploader.single('photo'), userCtrl.uploadImage);
}
