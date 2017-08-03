import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import authentication from './../util/authentication';
import authorization from './../util/authorization';
import ResponseService from './../util/responseService';
import SendGridService from './../util/sendGridService';

// controllers
import gameController from './../controllers/gameController';
import personController from './../controllers/personController';
import organizationController from './../controllers/organizationController';

import phoneController from './../controllers/phoneController';
import sportController from './../controllers/sportController';
import userController from './../controllers/userController';

// routes
import gameRoutes from './gameRoutes';
import personRoutes from './personRoutes';
import organizationRoutes from './organizationRoutes';
import phoneRoutes from './phoneRoutes';
import sportRoutes from './sportRoutes';
import userRoutes from './userRoutes';

export default function setRoutes(app, models) {

  const router = express.Router();
  const external = {
    authorization: authorization(),
    authentication: authentication,
    router: router
  };
  const gameCtrl = gameController(models, ResponseService);
  const personCtrl = personController(models, ResponseService);
  const userCtrl = userController(bcrypt, jwt, models, ResponseService, SendGridService);
  const sportCtrl = sportController(models, ResponseService);
  const organizationCtrl = organizationController(models, ResponseService);
  const phoneCtrl = phoneController(models, ResponseService);

  gameRoutes(external, gameCtrl);
  personRoutes(external, personCtrl);
  organizationRoutes(external, organizationCtrl);
  phoneRoutes(external, phoneCtrl);
  sportRoutes(external, sportCtrl);
  userRoutes(external, userCtrl);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
