import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
//import * as redis from 'redis';
//import * as ExpressBrute from 'express-brute';
//import * as RedisStore from 'express-brute-redis';
import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as _ from 'lodash';

// Middleware
import authentication from './../util/authentication';
import authorization from './../util/authorization';
import ResponseService from './../util/responseService';
import SendGridService from './../util/sendGridService';

// controllers
import addressController from './../controllers/addressController';
import areaController from './../controllers/areaController';
import blogController from './../controllers/blogController';
import meetingController from './../controllers/meetingController';
import matchController from './../controllers/matchController';
import officiateController from './../controllers/officiateController';
import organizationController from './../controllers/organizationController';
import passwordController from './../controllers/passwordController';
import personController from './../controllers/personController';
import phoneController from './../controllers/phoneController';
import sportController from './../controllers/sportController';
import stripeController from './../controllers/stripeController';
import userController from './../controllers/userController';

import loginController from './../controllers/loginController';
import registerController from './../controllers/registerController';

// routes
import addressRoutes from './addressRoutes';
import areaRoutes from './areaRoutes';
import blogRoutes from './blogRoutes';
import meetingRoutes from './meetingRoutes';
import matchRoutes from './matchRoutes';
import officiateRoutes from './officiateRoutes';
import organizationRoutes from './organizationRoutes';
import personRoutes from './personRoutes';
import phoneRoutes from './phoneRoutes';
import sportRoutes from './sportRoutes';
import stripeRoutes from './stripeRoutes';
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

const allowedMimeTypes = /(jpeg|jpg|png|bmp|giff)$/;
const config = {
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
};
aws.config.update(config);

aws.config.logger = console;

const s3 = new aws.S3();
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      const makeName = type => Date.now().toString() + '.' + type;
      const filename = _.replace(file.mimetype, allowedMimeTypes, makeName);
      cb(null, filename);
    }
  }),
  fileFilter: function(req, files, cb) {
    let mimeTypesRegex = allowedMimeTypes;
    let mimeType = files.mimetype;

    if (mimeTypesRegex.test(mimeType)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

export default function setRoutes(app, models) {
  const router = express.Router();
  const external = {
    authorization: authorization(models),
    authentication: authentication,
    router: router,
    imageUploader: imageUploader
  };
  const responseService = new ResponseService(models);

  const addressCtrl = addressController(models, responseService);
  const blogCtrl = blogController(models, responseService);
  const meetingCtrl = meetingController(models, responseService);
  const matchCtrl = matchController(models, responseService);
  const areaCtrl = areaController(models, responseService);
  const officiateCtrl = officiateController(
    models,
    responseService,
    SendGridService
  );
  const organizationCtrl = organizationController(models, responseService);
  const personCtrl = personController(models, responseService);
  const phoneCtrl = phoneController(models, responseService);
  const sportCtrl = sportController(models, responseService);
  const stripeCtrl = stripeController(models, responseService);

  const userCtrl = userController(models, responseService, SendGridService);
  const loginCtrl = loginController(
    bcrypt,
    jwt,
    models,
    responseService,
    SendGridService
  );
  const passwordCtrl = passwordController(
    bcrypt,
    jwt,
    models,
    responseService,
    SendGridService
  );
  const registerCtrl = registerController(
    bcrypt,
    jwt,
    models,
    responseService,
    SendGridService
  );

  const ctrl = {
    loginCtrl,
    passwordCtrl,
    userCtrl,
    registerCtrl
  };

  addressRoutes(external, addressCtrl);
  blogRoutes(external, blogCtrl);
  meetingRoutes(external, meetingCtrl);
  matchRoutes(external, matchCtrl);
  areaRoutes(external, areaCtrl);
  personRoutes(external, personCtrl);
  officiateRoutes(external, officiateCtrl);
  organizationRoutes(external, organizationCtrl);
  phoneRoutes(external, phoneCtrl);
  sportRoutes(external, sportCtrl);
  stripeRoutes(external, stripeCtrl);
  userRoutes(external, ctrl);

  // Apply the routes to our application with the prefix /api
  //  app.use('/api', bruteforce.prevent, router);
  app.use('/api', router);
}
