"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptService = require("../util/bcryptService");
var sequelize = null;
var User = null;
var users = [{
        email: 'admin1@rentaref.com',
        password: 'admin1',
        authorization: 1
    }, {
        email: 'admin2@rentaref.com',
        password: 'admin2',
        authorization: 2
    }];
function insertUser(User) {
    console.log('Attempting to create users');
    users.forEach(function (user) {
        bcryptService.hash(user.password)
            .then(function (password) {
            user.password = password;
            console.log('password:', user.email, password);
            return User.findOne({
                where: { email: user.email, password: user.password }
            });
        })
            .then(function (newUser) {
            if (!newUser) {
                return User.create(user);
            }
        })
            .catch(function (error) {
            throw (error);
        });
    });
}
function insertData(models, doInsert) {
    if (doInsert === void 0) { doInsert = false; }
    if (doInsert) {
        sequelize = models.sequelize;
        sequelize.sync({
            force: true
        })
            .then(function () { return insertUser(models.User); })
            .catch(function (error) {
            throw Error(error);
        });
    }
}
exports.default = insertData;
//# sourceMappingURL=index.js.map