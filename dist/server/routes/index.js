"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var authentication_1 = require("./../util/authentication");
var responseService_1 = require("./../util/responseService");
// controllers
var gameController_1 = require("./../controllers/gameController");
var personController_1 = require("./../controllers/personController");
var organizationController_1 = require("./../controllers/organizationController");
var sportController_1 = require("./../controllers/sportController");
var userController_1 = require("./../controllers/userController");
// routes
var gameRoutes_1 = require("./gameRoutes");
var personRoutes_1 = require("./personRoutes");
var organizationRoutes_1 = require("./organizationRoutes");
var sportRoutes_1 = require("./sportRoutes");
var userRoutes_1 = require("./userRoutes");
function setRoutes(app, models) {
    var router = express.Router();
    var gameCtrl = gameController_1.default(models, responseService_1.default);
    var personCtrl = personController_1.default(models, responseService_1.default);
    var userCtrl = userController_1.default(models, responseService_1.default);
    var sportCtrl = sportController_1.default(models, responseService_1.default);
    var organizationCtrl = organizationController_1.default(models, responseService_1.default);
    gameRoutes_1.default(router, authentication_1.default, gameCtrl);
    personRoutes_1.default(router, authentication_1.default, personCtrl);
    organizationRoutes_1.default(router, authentication_1.default, organizationCtrl);
    sportRoutes_1.default(router, authentication_1.default, sportCtrl);
    userRoutes_1.default(router, authentication_1.default, userCtrl);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=index.js.map