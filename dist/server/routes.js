"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var person_1 = require("./controllers/person");
var user_1 = require("./controllers/user");
function setRoutes(app, models) {
    var router = express.Router();
    var personCtrl = new person_1.default(models.Person);
    var userCtrl = new user_1.default(models.User);
    // Cats
    router.route('/person').get(personCtrl.getAll);
    router.route('/person/count').get(personCtrl.count);
    router.route('/person').post(personCtrl.insert);
    router.route('/person/:id').get(personCtrl.get);
    router.route('/person/:id').put(personCtrl.update);
    router.route('/person/:id').delete(personCtrl.delete);
    // Users
    router.route('/login').post(userCtrl.login);
    /*
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
  */
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map