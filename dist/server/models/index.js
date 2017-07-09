"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../config/index");
var sequelize_1 = require("sequelize");
var models = [
    'Game',
    'Person',
    'Sport',
    'User',
];
var serverName = process.env.serverName || 'test';
var configuration = index_1.default[serverName];
var database = configuration.database;
//connect to database using sequelize
exports.sequelize = new sequelize_1.default(database.name, database.user, database.password, database.settings);
console.log('setting:', database.settings);
//Export models
models.forEach(function (model) {
    module.exports[model] = exports.sequelize.import(__dirname + '/' + model);
});
(function (m) {
    module.exports.Game = exports.sequelize.models.game;
    module.exports.Person = exports.sequelize.models.person;
    module.exports.Sport = exports.sequelize.models.sport;
    module.exports.User = exports.sequelize.models.user;
})(module.exports);
console.log('=========== Database is:', serverName);
//sequelize.sync();
//Export sequelize
//export sequelize;
//# sourceMappingURL=index.js.map