"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var base_1 = require("./base");
var bcrypt = require("bcryptjs");
var responseService_1 = require("./../util/responseService");
var UserCtrl = (function (_super) {
    __extends(UserCtrl, _super);
    function UserCtrl(User) {
        var _this = _super.call(this) || this;
        _this.model = null;
        // Get all
        _this.getAll = function (req, res) {
            console.log('get all users');
            _this.model.findAll({
                attributes: ['id', 'email', 'authorization']
            })
                .then(function (results) { return responseService_1.default.success(res, results); })
                .catch(function (error) { return responseService_1.default.exception(res, error); });
        };
        _this.get = function (req, res) {
            console.log('get user');
            _this.model.findAll({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'email', 'authorization']
            })
                .then(function (results) { return responseService_1.default.success(res, results); })
                .catch(function (error) { return responseService_1.default.exception(res, error); });
        };
        _this.create = function (req, res) {
            var user = new Object(req.body);
            _this.model.create(user)
                .then(function (newUser) {
                var user = {
                    id: newUser.id,
                    email: newUser.email,
                    authorization: newUser.authorization
                };
                responseService_1.default.success(res, user);
            })
                .catch(function (error) { return responseService_1.default.exception(res, error); });
        };
        _this.update = function (req, res) {
            var user = new Object(req.body);
            _this.model.update(user, {
                where: {
                    id: req.params.id
                }
            })
                .then(function (result) { return responseService_1.default.success(res, "User updated"); })
                .catch(function (error) { return responseService_1.default.exception(res, error); });
        };
        _this.delete = function (req, res) {
            var user = new Object(req.body);
            _this.model.destroy(user)
                .then(function (result) { return responseService_1.default.success(res, "User deleted"); })
                .catch(function (error) { return responseService_1.default.exception(res, error); });
        };
        _this.login = function (req, res) {
            var user = {
                email: req.body.email,
                password: req.body.password
            };
            _this.model.findOne({
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
        };
        _this.logout = function (req, res) {
            var user = new Object(req.body);
        };
        _this.model = User;
        return _this;
    }
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map