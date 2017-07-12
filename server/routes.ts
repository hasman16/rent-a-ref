import * as express from 'express';

import PersonCtrl from './controllers/person';
import UserCtrl from './controllers/user';

export default function setRoutes(app, models) {

  const router = express.Router();

  const personCtrl = new PersonCtrl(models.Person);
  const userCtrl = new UserCtrl(models.User);

  // Cats
  router.route('/person').get(personCtrl.getAll);
  router.route('/person/count').get(personCtrl.count);
  router.route('/person').post(personCtrl.insert);
  router.route('/person/:id').get(personCtrl.get);
  router.route('/person/:id').put(personCtrl.update);
  router.route('/person/:id').delete(personCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/user').get(userCtrl.getAll);
  router.route('/user').post(userCtrl.create);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
