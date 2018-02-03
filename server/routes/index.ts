import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as redis from 'redis';
import * as ExpressBrute from 'express-brute';
import * as RedisStore from 'express-brute-redis';

// Middleware
import authentication from './../util/authentication';
import authorization from './../util/authorization';
import ResponseService from './../util/responseService';
import SendGridService from './../util/sendGridService';

// controllers
import addressController from './../controllers/addressController';
import areaController from './../controllers/areaController';
import blogController from './../controllers/blogController';
import gameController from './../controllers/gameController';
import organizationController from './../controllers/organizationController';
import passwordController from './../controllers/passwordController';
import personController from './../controllers/personController';
import phoneController from './../controllers/phoneController';
import sportController from './../controllers/sportController';
import userController from './../controllers/userController';

import loginController from './../controllers/loginController';
import registerController from './../controllers/registerController';

// routes
import addressRoutes from './addressRoutes';
import areaRoutes from './areaRoutes';
import blogRoutes from './blogRoutes';
import gameRoutes from './gameRoutes';
import organizationRoutes from './organizationRoutes';
import personRoutes from './personRoutes';
import phoneRoutes from './phoneRoutes';
import sportRoutes from './sportRoutes';
import userRoutes from './userRoutes';

/*
let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL, {
    no_ready_check: true
  });
} else {
  client = redis.createClient(6379, '127.0.0.1', {
    no_ready_check: true
  });
}

const store = new RedisStore({
  client: client
});
*/
//const bruteforce = new ExpressBrute(store);

export default function setRoutes(app, models) {
  const router = express.Router();
  const external = {
    authorization: authorization(models),
    authentication: authentication,
    router: router
  };
  const responseService = new ResponseService(models);

  const addressCtrl = addressController(models, responseService);
  const blogCtrl = blogController(models, responseService);
  const gameCtrl = gameController(models, responseService);
  const areaCtrl = areaController(models, responseService);
  const organizationCtrl = organizationController(models, responseService);
  const personCtrl = personController(models, responseService);
  const phoneCtrl = phoneController(models, responseService);
  const sportCtrl = sportController(models, responseService);

  const userCtrl = userController(models, responseService, SendGridService);
  const loginCtrl = loginController(bcrypt, jwt, models, responseService, SendGridService);
  const passwordCtrl = passwordController(bcrypt, jwt, models, responseService, SendGridService);
  const registerCtrl = registerController(bcrypt, jwt, models, responseService, SendGridService);

  const ctrl = {
    loginCtrl,
    passwordCtrl,
    userCtrl,
    registerCtrl
  };

  addressRoutes(external, addressCtrl);
  blogRoutes(external, blogCtrl);
  gameRoutes(external, gameCtrl);
  areaRoutes(external, areaCtrl);
  personRoutes(external, personCtrl);
  organizationRoutes(external, organizationCtrl);
  phoneRoutes(external, phoneCtrl);
  sportRoutes(external, sportCtrl);
  userRoutes(external, ctrl);

  // Apply the routes to our application with the prefix /api
  //  app.use('/api', bruteforce.prevent, router);
  app.use('/api', router);
}
