import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import authentication from './../util/authentication';
import authorization from './../util/authorization';
import ResponseService from './../util/responseService';
import SendGridService from './../util/sendGridService';

// controllers
import addressController from './../controllers/addressController';
import gameController from './../controllers/gameController';
import organizationController from './../controllers/organizationController';
import personController from './../controllers/personController';
import phoneController from './../controllers/phoneController';
import sportController from './../controllers/sportController';
import userController from './../controllers/userController';

// routes
import addressRoutes from './addressRoutes';
import gameRoutes from './gameRoutes';
import organizationRoutes from './organizationRoutes';
import personRoutes from './personRoutes';
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

  const addressCtrl = addressController(models, ResponseService);
  const gameCtrl = gameController(models, ResponseService);
  const organizationCtrl = organizationController(models, ResponseService);
  const personCtrl = personController(models, ResponseService);
  const phoneCtrl = phoneController(models, ResponseService);
  const sportCtrl = sportController(models, ResponseService);
  const userCtrl = userController(bcrypt, jwt, models, ResponseService, SendGridService);

  addressRoutes(external, addressCtrl);
  gameRoutes(external, gameCtrl);
  personRoutes(external, personCtrl);
  organizationRoutes(external, organizationCtrl);
  phoneRoutes(external, phoneCtrl);
  sportRoutes(external, sportCtrl);
  userRoutes(external, userCtrl);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
