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
var gameController_1 = require("./../controllers/gameController");
var personController_1 = require("./../controllers/personController");
var organizationController_1 = require("./../controllers/organizationController");
var phoneController_1 = require("./../controllers/phoneController");
var sportController_1 = require("./../controllers/sportController");
var userController_1 = require("./../controllers/userController");
// routes
var gameRoutes_1 = require("./gameRoutes");
var personRoutes_1 = require("./personRoutes");
var organizationRoutes_1 = require("./organizationRoutes");
var phoneRoutes_1 = require("./phoneRoutes");
var sportRoutes_1 = require("./sportRoutes");
var userRoutes_1 = require("./userRoutes");
function setRoutes(app, models) {
    var router = express.Router();
    var external = {
        authorization: authorization_1.default(),
        authentication: authentication_1.default,
        router: router
    };
    var gameCtrl = gameController_1.default(models, responseService_1.default);
    var personCtrl = personController_1.default(models, responseService_1.default);
    var userCtrl = userController_1.default(bcrypt, jwt, models, responseService_1.default, sendGridService_1.default);
    var sportCtrl = sportController_1.default(models, responseService_1.default);
    var organizationCtrl = organizationController_1.default(models, responseService_1.default);
    var phoneCtrl = phoneController_1.default(models, responseService_1.default);
    gameRoutes_1.default(external, gameCtrl);
    personRoutes_1.default(external, personCtrl);
    organizationRoutes_1.default(external, organizationCtrl);
    phoneRoutes_1.default(external, phoneCtrl);
    sportRoutes_1.default(external, sportCtrl);
    userRoutes_1.default(external, userCtrl);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=index.js.map