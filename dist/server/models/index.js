"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var index_1 = require("../config/index");
var sequelize_1 = require("sequelize");
dotenv.load({ path: '.env' });
var models = [
    'Address',
    'Area',
    'Comment',
    'Email',
    'Game',
    'Image',
    'Lock',
    'Match',
    'Organization',
    'Person',
    'Phone',
    'Post',
    'Price',
    'Sport',
    'User'
];
function herokuSetup() {
    console.log('=========== Server is: heroku');
    return new sequelize_1.default(process.env.DATABASE_URL);
}
function localhostSetup() {
    var serverName = process.env.serverName || 'test';
    var configuration = index_1.default[serverName];
    var database = configuration.database;
    console.log('=========== Server is:', serverName);
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
    m.User.hasMany(m.Area);
    m.User.hasOne(m.Lock);
    m.Lock.belongsTo(m.User);
    m.User.belongsToMany(m.Sport, {
        through: 'referee'
    });
    m.User.hasMany(m.Organization);
    m.User.belongsToMany(m.Image, {
        through: 'user_image'
    });
    m.User.belongsToMany(m.Organization, {
        through: 'organizer'
    });
    m.User.belongsToMany(m.Address, {
        through: 'user_address'
    });
    m.Address.belongsToMany(m.User, {
        through: 'user_address'
    });
    m.User.belongsToMany(m.Phone, {
        through: 'user_phone'
    });
    m.Phone.belongsToMany(m.User, {
        through: 'user_phone'
    });
    m.Game.belongsTo(m.Organization);
    m.Game.belongsTo(m.Address);
    m.Game.belongsTo(m.Phone);
    m.Game.belongsTo(m.Sport);
    m.User.belongsToMany(m.Match, {
        through: 'officiating'
    });
    m.Match.belongsToMany(m.User, {
        through: 'officiating'
    });
    m.Match.belongsTo(m.Sport);
    m.Match.belongsTo(m.Game);
    m.Match.belongsTo(m.Address);
    m.Match.belongsTo(m.Phone);
    m.User.hasMany(m.Post);
    m.Post.hasMany(m.Comment);
    m.Comment.belongsTo(m.Post);
    m.Post.belongsTo(m.User);
    m.Organization.belongsToMany(m.Image, {
        through: 'organization_image'
    });
    m.Organization.belongsToMany(m.Address, {
        through: 'organization_address'
    });
    m.Address.belongsToMany(m.Organization, {
        through: 'organization_address'
    });
    m.Organization.belongsToMany(m.Phone, {
        through: 'organization_phone'
    });
    m.Phone.belongsToMany(m.Organization, {
        through: 'organization_phone'
    });
    module.exports.Referee = exports.sequelize.models.referee;
    module.exports.Match = exports.sequelize.models.match;
    module.exports.Officiating = exports.sequelize.models.officiating;
    module.exports.Organizer = exports.sequelize.models.organizer;
    module.exports.OrganizationAddress = exports.sequelize.models.organization_address;
    module.exports.OrganizationImage = exports.sequelize.models.organization_image;
    module.exports.OrganizationPhone = exports.sequelize.models.organization_phone;
    module.exports.UserAddress = exports.sequelize.models.user_address;
    module.exports.UserPhone = exports.sequelize.models.user_phone;
    module.exports.UserImage = exports.sequelize.models.user_image;
})(module.exports);
//# sourceMappingURL=index.js.map