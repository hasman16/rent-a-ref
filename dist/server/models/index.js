"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var index_1 = require("../config/index");
var sequelize_1 = require("sequelize");
dotenv.load({ path: '.env' });
var models = [
    'Address',
    'Game',
    'Organization',
    'Person',
    'Phone',
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
if (process.env.DATABASE_URL) {
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
    m.User.hasOne(m.Person);
    m.Person.belongsToMany(m.Sport, {
        through: 'referee'
    });
    m.Person.hasMany(m.Organization);
    m.Person.belongsToMany(m.Organization, {
        through: 'organizer'
    });
    m.Person.belongsToMany(m.Address, {
        through: 'person_addresses'
    });
    m.Person.belongsToMany(m.Phone, {
        through: 'person_phone'
    });
    m.Game.belongsTo(exports.sequelize.models.organizer);
    m.Person.belongsToMany(m.Game, {
        through: 'match'
    });
    m.Sport.belongsToMany(m.Game, {
        through: 'match'
    });
    m.Organization.belongsToMany(m.Address, {
        through: 'organization_addresses'
    });
    m.Organization.belongsToMany(m.Phone, {
        through: 'organization_phone'
    });
    module.exports.Referee = exports.sequelize.models.referee;
    module.exports.Match = exports.sequelize.models.match;
    module.exports.Organizer = exports.sequelize.models.organizer;
    module.exports.OrganizationAddress = exports.sequelize.models.organization_address;
    module.exports.OrganizationPhone = exports.sequelize.models.organization_phone;
    module.exports.PersonAddress = exports.sequelize.models.person_address;
    module.exports.PersonPhone = exports.sequelize.models.person_phone;
})(module.exports);
//# sourceMappingURL=index.js.map