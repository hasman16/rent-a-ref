"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var authentication_1 = require("./../util/authentication");
// controllers
var personController_1 = require("./../controllers/personController");
var organizationController_1 = require("./../controllers/organizationController");
var userController_1 = require("./../controllers/userController");
// routes
var personRoutes_1 = require("./personRoutes");
var organizationRoutes_1 = require("./organizationRoutes");
var userRoutes_1 = require("./userRoutes");
function setRoutes(app, models) {
    var router = express.Router();
    var personCtrl = personController_1.default(models);
    var userCtrl = userController_1.default(models);
    var organizationCtrl = organizationController_1.default(models);
    personRoutes_1.default(router, authentication_1.default, personCtrl);
    organizationRoutes_1.default(router, authentication_1.default, organizationCtrl);
    userRoutes_1.default(router, authentication_1.default, userCtrl);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=index.js.map