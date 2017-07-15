"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
function UserController(models, ResponseService) {
    var User = models.User;
    // Get all
    function getAll(req, res) {
        User.findAll({
            attributes: ['id', 'email', 'authorization']
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        User.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'email', 'authorization']
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function returnUser(res, newUser) {
        var user = {
            id: newUser.id,
            email: newUser.email,
            authorization: newUser.authorization
        };
        ResponseService.success(res, user);
    }
    function create(req, res) {
        var aUser = {
            email: req.body.email,
            password: req.body.password,
            authorization: req.body.authorization || 5
        };
        User.findOne({
            where: { email: aUser.email },
            attributes: ['id', 'email', 'authorization']
        })
            .then(function (newUser) {
            if (newUser) {
                ResponseService.success(res, newUser);
            }
            else {
                return bcrypt.hash(aUser.password, 10)
                    .then(function (password) {
                    var user = {
                        email: aUser.email,
                        password: password,
                        authorization: aUser.authorization
                    };
                    return User.create(user);
                })
                    .then(function (newUser) { return returnUser(res, newUser); });
            }
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var user = new Object(req.body);
        User.update(user, {
            where: {
                id: req.params.id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'User updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var user = new Object(req.body);
        User.destroy(user)
            .then(function (result) { return ResponseService.success(res, 'User deleted'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function login(req, res) {
        var user = {
            email: req.body.email,
            password: req.body.password
        };
        User.findOne({
            where: { email: user.email }
        }).then(function (newUser) {
            if (newUser) {
                return bcrypt.compare(user.password, newUser.password)
                    .then(function (result) {
                    if (result) {
                        var user_1 = {
                            id: newUser.id,
                            email: newUser.email,
                            authorization: newUser.authorization
                        };
                        var token = jwt.sign(user_1, process.env.SECRET_TOKEN, {
                            expiresIn: 1440 * 60
                        });
                        ResponseService.success(res, {
                            success: true,
                            message: 'Authorization success',
                            token: token,
                            accessLevel: newUser.authorization
                        });
                    }
                    else {
                        ResponseService.failure(res, 'Authorization failed');
                    }
                });
            }
            else {
                ResponseService.failure(res, 'Authorization failed');
            }
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
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