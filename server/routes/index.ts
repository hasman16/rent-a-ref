import * as express from 'express';
import authentication from './../util/authentication';
// controllers
import personController from './../controllers/personController';
import organizationController from './../controllers/organizationController';
import userController from './../controllers/userController';

// routes
import personRoutes from './personRoutes';
import organizationRoutes from './organizationRoutes';
import userRoutes from './userRoutes';

export default function setRoutes(app, models) {

  const router = express.Router();

  const personCtrl = personController(models);
  const userCtrl = userController(models);
  const organizationCtrl = organizationController(models);

  personRoutes(router, authentication, personCtrl);
  organizationRoutes(router, authentication, organizationCtrl);
  userRoutes(router, authentication, userCtrl);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
