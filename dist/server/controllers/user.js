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
function hash(value) {
    return bcrypt.hash(value, 10);
}
;
var UserCtrl = (function (_super) {
    __extends(UserCtrl, _super);
    function UserCtrl(User) {
        var _this = _super.call(this) || this;
        _this.model = null;
        _this.login = function (req, res) {
            var user = {
                email: req.body.email,
                password: req.body.password
            };
            function testing() {
                console.log('testing');
            }
            function authorizationFailed() {
                res.status(403).json({
                    success: false,
                    message: 'Authorization failed'
                });
            }
            _this.model.findOne({
                where: { email: user.email }
            }).then(function (newUser) {
                var token = null;
                if (newUser) {
                    console.log('hash:', user.password, newUser.password);
                    return bcrypt.compare(user.password, newUser.password)
                        .then(function (result) {
                        console.log('result is:', result);
                        if (result) {
                            token = jwt.sign(user, process.env.SECRET_TOKEN, {
                                expiresIn: 1440 * 60
                            });
                            res.status(200).json({
                                success: true,
                                message: 'Authorization success',
                                token: token,
                                accessLevel: newUser.authorization
                            });
                        }
                        else {
                            authorizationFailed();
                        }
                    });
                }
                else {
                    authorizationFailed();
                }
            })
                .catch(function (error) {
                console.log('error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurred'
                });
            });
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