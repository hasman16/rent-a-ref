"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var index_1 = require("../config/index");
var sequelize_1 = require("sequelize");
dotenv.load({ path: '.env' });
var models = [
    'Game',
    'Organization',
    'Person',
    'Sport',
    'User',
];
function herokuSetup() {
    console.log('=========== Database is: heroku');
    return new sequelize_1.default(process.env.DATABASE_URL);
}
function localhostSetup() {
    var serverName = process.env.serverName || 'test';
    var configuration = index_1.default[serverName];
    var database = configuration.database;
    console.log('=========== Database is:', serverName);
    // connect to database using sequelize
    return new sequelize_1.default(database.name, database.user, database.password, database.settings);
}
var sqlize;
if (process.env.DATABASE_URI) {
    sqlize = herokuSetup();
}
else {
    sqlize = localhostSetup();
}
exports.sequelize = sqlize;
// Export models
models.forEach(function (model) {
    module.exports[model] = exports.sequelize.import(__dirname + '/' + model);
});
(function (m) {
    m.Person.belongsTo(m.User);
    m.Person.belongsToMany(m.Sport, {
        through: 'referee'
    });
    m.Organization.belongsTo(m.Person);
    m.Person.belongsToMany(m.Organization, {
        through: 'team'
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
//# sourceMappingURL=index.js.map