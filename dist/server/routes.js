"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var authentication_1 = require("./util/authentication");
var person_1 = require("./controllers/person");
var user_1 = require("./controllers/user");
function setRoutes(app, models) {
    var router = express.Router();
    var personCtrl = person_1.default(models);
    var userCtrl = user_1.default(models);
    // Cats
    router.route('/person').get(authentication_1.default, personCtrl.getAll);
    router.route('/person').post(authentication_1.default, personCtrl.create);
    router.route('/person/:id').get(authentication_1.default, personCtrl.getOne);
    router.route('/person/:id').put(authentication_1.default, personCtrl.update);
    router.route('/person/:id').delete(authentication_1.default, personCtrl.deleteOne);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/logout').post(userCtrl.logout);
    router.route('/user').get(authentication_1.default, userCtrl.getAll);
    router.route('/user').post(authentication_1.default, userCtrl.create);
    router.route('/user/:id').get(authentication_1.default, userCtrl.getOne);
    router.route('/user/:id').put(authentication_1.default, userCtrl.update);
    router.route('/user/:id').delete(authentication_1.default, userCtrl.deleteOne);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map