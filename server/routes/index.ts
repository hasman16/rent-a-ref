import * as express from 'express';
import authentication from './../util/authentication';
import ResponseService from './../util/responseService';

// controllers
import gameController from './../controllers/gameController';
import personController from './../controllers/personController';
import organizationController from './../controllers/organizationController';
import sportController from './../controllers/sportController';
import userController from './../controllers/userController';

// routes
import gameRoutes from './gameRoutes';
import personRoutes from './personRoutes';
import organizationRoutes from './organizationRoutes';
import sportRoutes from './sportRoutes';
import userRoutes from './userRoutes';

export default function setRoutes(app, models) {

  const router = express.Router();

  const gameCtrl = gameController(models, ResponseService);
  const personCtrl = personController(models, ResponseService);
  const userCtrl = userController(models, ResponseService);
  const sportCtrl = sportController(models, ResponseService);
  const organizationCtrl = organizationController(models, ResponseService);

  gameRoutes(router, authentication, gameCtrl);
  personRoutes(router, authentication, personCtrl);
  organizationRoutes(router, authentication, organizationCtrl);
  sportRoutes(router, authentication, sportCtrl);
  userRoutes(router, authentication, userCtrl);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
