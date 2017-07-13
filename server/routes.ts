import * as express from 'express';
import authentication from './util/authentication';
import PersonController from './controllers/person';
import userController from './controllers/user';

export default function setRoutes(app, models) {

  const router = express.Router();

  const personCtrl = PersonController(models);
  const userCtrl = userController(models);

  // Cats
  router.route('/person').get(authentication, personCtrl.getAll);
  router.route('/person').post(authentication, personCtrl.create);
  router.route('/person/:id').get(authentication, personCtrl.getOne);
  router.route('/person/:id').put(authentication, personCtrl.update);
  router.route('/person/:id').delete(authentication, personCtrl.deleteOne);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/logout').post(userCtrl.logout);
  
  router.route('/user').get(authentication, userCtrl.getAll);
  router.route('/user').post(authentication, userCtrl.create);
  router.route('/user/:id').get(authentication, userCtrl.getOne);
  router.route('/user/:id').put(authentication, userCtrl.update);
  router.route('/user/:id').delete(authentication, userCtrl.deleteOne);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
