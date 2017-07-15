"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var responseService_1 = require("./../util/responseService");
function UserController(models) {
    var User = models.User;
    // Get all
    function getAll(req, res) {
        console.log('get all users');
        User.findAll({
            attributes: ['id', 'email', 'authorization']
        })
            .then(function (results) { return responseService_1.default.success(res, results); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function getOne(req, res) {
        console.log('get user');
        User.findAll({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'email', 'authorization']
        })
            .then(function (results) { return responseService_1.default.success(res, results); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function create(req, res) {
        var aUser = new Object(req.body);
        User.create(aUser)
            .then(function (newUser) {
            var user = {
                id: newUser.id,
                email: newUser.email,
                authorization: newUser.authorization
            };
            responseService_1.default.success(res, user);
        })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function update(req, res) {
        var user = new Object(req.body);
        User.update(user, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return responseService_1.default.success(res, 'User updated'); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function deleteOne(req, res) {
        var user = new Object(req.body);
        User.destroy(user)
            .then(function (result) { return responseService_1.default.success(res, 'User deleted'); })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function login(req, res) {
        var user = {
            email: req.body.email,
            password: req.body.password
        };
        console.log('secret:', process.env.SECRET_TOKEN);
        User.findOne({
            where: { email: user.email }
        }).then(function (newUser) {
            var token = null;
            if (newUser) {
                return bcrypt.compare(user.password, newUser.password)
                    .then(function (result) {
                    if (result) {
                        token = jwt.sign(user, process.env.SECRET_TOKEN, {
                            expiresIn: 1440 * 60
                        });
                        responseService_1.default.success(res, {
                            success: true,
                            message: 'Authorization success',
                            token: token,
                            accessLevel: newUser.authorization
                        });
                    }
                    else {
                        responseService_1.default.failure(res, 'Authorization failed');
                    }
                });
            }
            else {
                responseService_1.default.failure(res, 'Authorization failed');
            }
        })
            .catch(function (error) { return responseService_1.default.exception(res, error); });
    }
    function logout(req, res) {
        var user = new Object(req.body);
    }
    return {
        login: login,
        logout: logout,
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne
    };
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map