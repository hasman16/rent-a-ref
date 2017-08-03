"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var index_1 = require("../config/index");
var sequelize_1 = require("sequelize");
dotenv.load({ path: '.env' });
var models = [
    'Address',
    'Email',
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
    m.User.belongsToMany(m.Sport, {
        through: 'referee'
    });
    m.User.hasMany(m.Organization);
    m.User.belongsToMany(m.Organization, {
        through: 'organizer'
    });
    m.User.belongsToMany(m.Address, {
        through: 'user_addresses'
    });
    m.User.belongsToMany(m.Phone, {
        through: 'user_phone'
    });
    m.Phone.belongsToMany(m.User, {
        through: 'user_phone'
    });
    m.Game.belongsTo(exports.sequelize.models.organizer);
    m.User.belongsToMany(m.Game, {
        through: 'match'
    });
    m.User.belongsToMany(m.Game, {
        through: 'match'
    });
    m.Organization.belongsToMany(m.Address, {
        through: 'organization_addresses'
    });
    m.Organization.belongsToMany(m.Phone, {
        through: 'organization_phone'
    });
    m.Phone.belongsToMany(m.Organization, {
        through: 'organization_phone'
    });
    module.exports.Referee = exports.sequelize.models.referee;
    module.exports.Match = exports.sequelize.models.match;
    module.exports.Organizer = exports.sequelize.models.organizer;
    module.exports.OrganizationAddress = exports.sequelize.models.organization_address;
    module.exports.OrganizationPhone = exports.sequelize.models.organization_phone;
    module.exports.UserAddress = exports.sequelize.models.user_address;
    module.exports.UserPhone = exports.sequelize.models.user_phone;
})(module.exports);
//# sourceMappingURL=index.js.map