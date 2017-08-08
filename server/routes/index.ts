import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import authentication from './../util/authentication';
import authorization from './../util/authorization';
import ResponseService from './../util/responseService';
import SendGridService from './../util/sendGridService';

// controllers
import addressController from './../controllers/addressController';
import blogController from './../controllers/blogController';
import gameController from './../controllers/gameController';
import organizationController from './../controllers/organizationController';
import personController from './../controllers/personController';
import phoneController from './../controllers/phoneController';
import sportController from './../controllers/sportController';
import userController from './../controllers/userController';

// routes
import addressRoutes from './addressRoutes';
import blogRoutes from './blogRoutes';
import gameRoutes from './gameRoutes';
import organizationRoutes from './organizationRoutes';
import personRoutes from './personRoutes';
import phoneRoutes from './phoneRoutes';
import sportRoutes from './sportRoutes';
import userRoutes from './userRoutes';
import * as redis from 'redis';
import * as ExpressBrute from 'express-brute';
import * as RedisStore from 'express-brute-redis';

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

const bruteforce = new ExpressBrute(store);

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
  const organizationCtrl = organizationController(models, responseService);
  const personCtrl = personController(models, responseService);
  const phoneCtrl = phoneController(models, responseService);
  const sportCtrl = sportController(models, responseService);
  const userCtrl = userController(bcrypt, jwt, models, responseService, SendGridService);

  addressRoutes(external, addressCtrl);
  blogRoutes(external, blogCtrl);
  gameRoutes(external, gameCtrl);
  personRoutes(external, personCtrl);
  organizationRoutes(external, organizationCtrl);
  phoneRoutes(external, phoneCtrl);
  sportRoutes(external, sportCtrl);
  userRoutes(external, userCtrl);

  // Apply the routes to our application with the prefix /api
  app.use('/api', bruteforce.prevent, router);
}
