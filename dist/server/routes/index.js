"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var authentication_1 = require("./../util/authentication");
var authorization_1 = require("./../util/authorization");
var responseService_1 = require("./../util/responseService");
var sendGridService_1 = require("./../util/sendGridService");
// controllers
var addressController_1 = require("./../controllers/addressController");
var blogController_1 = require("./../controllers/blogController");
var gameController_1 = require("./../controllers/gameController");
var organizationController_1 = require("./../controllers/organizationController");
var personController_1 = require("./../controllers/personController");
var phoneController_1 = require("./../controllers/phoneController");
var sportController_1 = require("./../controllers/sportController");
var userController_1 = require("./../controllers/userController");
var loginController_1 = require("./../controllers/loginController");
var registerController_1 = require("./../controllers/registerController");
// routes
var addressRoutes_1 = require("./addressRoutes");
var blogRoutes_1 = require("./blogRoutes");
var gameRoutes_1 = require("./gameRoutes");
var organizationRoutes_1 = require("./organizationRoutes");
var personRoutes_1 = require("./personRoutes");
var phoneRoutes_1 = require("./phoneRoutes");
var sportRoutes_1 = require("./sportRoutes");
var userRoutes_1 = require("./userRoutes");
var redis = require("redis");
var ExpressBrute = require("express-brute");
var RedisStore = require("express-brute-redis");
var client;
if (process.env.REDIS_URL) {
    client = redis.createClient(process.env.REDIS_URL, {
        no_ready_check: true
    });
}
else {
    client = redis.createClient(6379, '127.0.0.1', {
        no_ready_check: true
    });
}
var store = new RedisStore({
    client: client
});
var bruteforce = new ExpressBrute(store);
function setRoutes(app, models) {
    var router = express.Router();
    var external = {
        authorization: authorization_1.default(models),
        authentication: authentication_1.default,
        router: router
    };
    var responseService = new responseService_1.default(models);
    var addressCtrl = addressController_1.default(models, responseService);
    var blogCtrl = blogController_1.default(models, responseService);
    var gameCtrl = gameController_1.default(models, responseService);
    var organizationCtrl = organizationController_1.default(models, responseService);
    var personCtrl = personController_1.default(models, responseService);
    var phoneCtrl = phoneController_1.default(models, responseService);
    var sportCtrl = sportController_1.default(models, responseService);
    var userCtrl = userController_1.default(bcrypt, jwt, models, responseService, sendGridService_1.default);
    var loginCtrl = loginController_1.default(bcrypt, jwt, models, responseService, sendGridService_1.default);
    var registerCtrl = registerController_1.default(bcrypt, jwt, models, responseService, sendGridService_1.default);
    var ctrl = {
        loginCtrl: loginCtrl,
        userCtrl: userCtrl,
        registerCtrl: registerCtrl
    };
    addressRoutes_1.default(external, addressCtrl);
    blogRoutes_1.default(external, blogCtrl);
    gameRoutes_1.default(external, gameCtrl);
    personRoutes_1.default(external, personCtrl);
    organizationRoutes_1.default(external, organizationCtrl);
    phoneRoutes_1.default(external, phoneCtrl);
    sportRoutes_1.default(external, sportCtrl);
    userRoutes_1.default(external, ctrl);
    // Apply the routes to our application with the prefix /api
    //  app.use('/api', bruteforce.prevent, router);
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=index.js.map