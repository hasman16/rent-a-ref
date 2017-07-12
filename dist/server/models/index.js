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
var serverName = "heroku";
process.env.serverName || 'test';
var configuration = index_1.default[serverName];
var database = configuration.database;
//connect to database using sequelize
exports.sequelize = new sequelize_1.default(database.name, database.user, database.password, database.settings);
//Export models
models.forEach(function (model) {
    module.exports[model] = exports.sequelize.import(__dirname + '/' + model);
});
(function (m) {
    m.Person.belongsTo(m.User);
    m.Person.belongsToMany(m.Sport, {
        through: 'referee'
    });
    m.Person.belongsToMany(m.Game, {
        through: 'match'
    });
    m.Sport.belongsToMany(m.Game, {
        through: 'match'
    });
    module.exports.Referee = exports.sequelize.models.referee;
    module.exports.Match = exports.sequelize.models.match;
})(module.exports);
console.log('=========== Database is:', serverName);
//sequelize.sync();
//Export sequelize
//export sequelize;
//# sourceMappingURL=index.js.map