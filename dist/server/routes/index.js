"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
var _ = require("lodash");
// Middleware
var authentication_1 = require("./../util/authentication");
var authorization_1 = require("./../util/authorization");
var responseService_1 = require("./../util/responseService");
var sendGridService_1 = require("./../util/sendGridService");
// controllers
var addressController_1 = require("./../controllers/addressController");
var areaController_1 = require("./../controllers/areaController");
var blogController_1 = require("./../controllers/blogController");
var meetingController_1 = require("./../controllers/meetingController");
var matchController_1 = require("./../controllers/matchController");
var officiateController_1 = require("./../controllers/officiateController");
var organizationController_1 = require("./../controllers/organizationController");
var passwordController_1 = require("./../controllers/passwordController");
var personController_1 = require("./../controllers/personController");
var phoneController_1 = require("./../controllers/phoneController");
var sportController_1 = require("./../controllers/sportController");
var stripeController_1 = require("./../controllers/stripeController");
var userController_1 = require("./../controllers/userController");
var loginController_1 = require("./../controllers/loginController");
var registerController_1 = require("./../controllers/registerController");
// routes
var addressRoutes_1 = require("./addressRoutes");
var areaRoutes_1 = require("./areaRoutes");
var blogRoutes_1 = require("./blogRoutes");
var meetingRoutes_1 = require("./meetingRoutes");
var matchRoutes_1 = require("./matchRoutes");
var officiateRoutes_1 = require("./officiateRoutes");
var organizationRoutes_1 = require("./organizationRoutes");
var personRoutes_1 = require("./personRoutes");
var phoneRoutes_1 = require("./phoneRoutes");
var sportRoutes_1 = require("./sportRoutes");
var stripeRoutes_1 = require("./stripeRoutes");
var userRoutes_1 = require("./userRoutes");
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
var allowedMimeTypes = /(jpeg|jpg|png|bmp|giff)$/;
var config = {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-west-1'
};
aws.config.update(config);
aws.config.logger = console;
var s3 = new aws.S3();
var imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            var makeName = function (type) { return Date.now().toString() + '.' + type; };
            var filename = _.replace(file.mimetype, allowedMimeTypes, makeName);
            cb(null, filename);
        }
    }),
    fileFilter: function (req, files, cb) {
        var mimeTypesRegex = allowedMimeTypes;
        var mimeType = files.mimetype;
        if (mimeTypesRegex.test(mimeType)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});
function setRoutes(app, models) {
    var router = express.Router();
    var external = {
        authorization: authorization_1.default(models),
        authentication: authentication_1.default,
        router: router,
        imageUploader: imageUploader
    };
    var responseService = new responseService_1.default(models);
    var addressCtrl = addressController_1.default(models, responseService);
    var blogCtrl = blogController_1.default(models, responseService);
    var meetingCtrl = meetingController_1.default(models, responseService);
    var matchCtrl = matchController_1.default(models, responseService);
    var areaCtrl = areaController_1.default(models, responseService);
    var officiateCtrl = officiateController_1.default(models, responseService, sendGridService_1.default);
    var organizationCtrl = organizationController_1.default(models, responseService);
    var personCtrl = personController_1.default(models, responseService);
    var phoneCtrl = phoneController_1.default(models, responseService);
    var sportCtrl = sportController_1.default(models, responseService);
    var stripeCtrl = stripeController_1.default(models, responseService);
    var userCtrl = userController_1.default(models, responseService, sendGridService_1.default);
    var loginCtrl = loginController_1.default(bcrypt, jwt, models, responseService, sendGridService_1.default);
    var passwordCtrl = passwordController_1.default(bcrypt, jwt, models, responseService, sendGridService_1.default);
    var registerCtrl = registerController_1.default(bcrypt, jwt, models, responseService, sendGridService_1.default);
    var ctrl = {
        loginCtrl: loginCtrl,
        passwordCtrl: passwordCtrl,
        userCtrl: userCtrl,
        registerCtrl: registerCtrl
    };
    addressRoutes_1.default(external, addressCtrl);
    blogRoutes_1.default(external, blogCtrl);
    meetingRoutes_1.default(external, meetingCtrl);
    matchRoutes_1.default(external, matchCtrl);
    areaRoutes_1.default(external, areaCtrl);
    personRoutes_1.default(external, personCtrl);
    officiateRoutes_1.default(external, officiateCtrl);
    organizationRoutes_1.default(external, organizationCtrl);
    phoneRoutes_1.default(external, phoneCtrl);
    sportRoutes_1.default(external, sportCtrl);
    stripeRoutes_1.default(external, stripeCtrl);
    userRoutes_1.default(external, ctrl);
    // Apply the routes to our application with the prefix /api
    //  app.use('/api', bruteforce.prevent, router);
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=index.js.map