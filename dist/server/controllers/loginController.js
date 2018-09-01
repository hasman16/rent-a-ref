"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring = require("randomstring");
var TOKEN_LIFESPAN = 20;
function LoginController(bcrypt, jwt, models, ResponseService, SendGridService) {
    var User = models.User;
    var Lock = models.Lock;
    var Person = models.Person;
    function lockUser(user_id) {
        return User.update({
            status: 'locked'
        }, {
            where: {
                id: user_id,
                status: 'active'
            }
        });
    }
    function unlockUser(user_id) {
        User.update({
            status: 'active'
        }, {
            where: {
                id: user_id,
                status: 'locked'
            }
        });
    }
    function updateLock(user_id, callback) {
        function doUpdate(lock) {
            return Lock.update({
                attempts: lock.attempts,
                passcode: lock.passcode
            }, {
                where: {
                    user_id: user_id
                }
            });
        }
        return Lock.findOne({
            where: {
                user_id: user_id
            }
        }).then(function (newLock) {
            var lock = callback(newLock.attempts, newLock.passcode);
            var updatePromise;
            if (lock.attempts >= 5) {
                updatePromise = bcrypt
                    .hash(lock.passcode, 12)
                    .then(function (passcode) {
                    lock.passcode = passcode;
                    return doUpdate(lock);
                })
                    .then(function () {
                    lockUser(user_id);
                });
            }
            else {
                updatePromise = doUpdate(lock);
            }
            return updatePromise;
        });
    }
    function failedLogin(res, user) {
        var dummy = 0;
        function callback(attempts, passcode) {
            attempts += 1;
            if (attempts >= 5) {
                attempts = 5;
                passcode = randomstring.generate();
                var content = 'There was more than 5 unsuccessful login attempts on your';
                content +=
                    ' account. Use the temp passcode below to reset your password: ';
                content += '\n\n ' + passcode;
                SendGridService.sendEmail({
                    to: user.email,
                    from: 'admin@rentaref.com',
                    subject: 'Account Locked.',
                    content: content
                });
            }
            dummy = attempts;
            return {
                attempts: attempts,
                passcode: passcode
            };
        }
        return updateLock(user.id, callback).then(function () {
            var message = 'Authorization failed';
            res.status(403).json({
                success: false,
                message: message,
                attempts: dummy
            });
        });
    }
    function loginSuccess(res, token, user) {
        ResponseService.success(res, {
            success: true,
            message: 'Authorization success',
            token: token,
            user: user
        }, 201);
    }
    function comparePassword(res, user, newUser) {
        var lock = newUser.lock;
        return bcrypt
            .compare(user.password, lock.password)
            .then(function (result) {
            if (result) {
                var _a = generateToken(newUser, TOKEN_LIFESPAN), user_1 = _a[0], token_1 = _a[1];
                return updateLock(user_1.id, function () {
                    return {
                        attempts: 0,
                        passcode: null
                    };
                }).then(function () {
                    loginSuccess(res, token_1, user_1);
                });
            }
            else {
                return failedLogin(res, newUser);
            }
        })
            .catch(function (error) { return failedLogin(res, newUser); });
    }
    function generateToken(newUser, minutes) {
        var person = newUser.person;
        var user = {
            id: newUser.id,
            email: newUser.email,
            authorization: newUser.authorization,
            person_id: person.id,
            firstname: person.firstname,
            lastname: person.lastname,
            can_referee: newUser.can_referee,
            can_organize: newUser.can_organize,
            status: newUser.status
        };
        return [
            user,
            jwt.sign(user, process.env.SECRET_TOKEN, {
                expiresIn: minutes * 60
            })
        ];
    }
    function userStatus(res, newUser) {
        var message = 'Contact Admin to enabled Account.';
        switch (newUser.status) {
            case 'banned':
                message = 'Account banned by the Admin.';
                break;
            case 'suspended':
                message = 'Account suspended by the Admin.';
                break;
            case 'locked':
                message = 'Login is locked. Reset password.';
                break;
            case 'pending':
                message = 'Account is awaiting Admin approval.';
                break;
        }
        ResponseService.failure(res, message);
    }
    function login(req, res) {
        var user = {
            email: req.body.email,
            password: req.body.password
        };
        User.findOne({
            where: { email: user.email },
            include: [
                {
                    model: Person
                },
                {
                    model: Lock
                }
            ]
        })
            .then(function (newUser) {
            if (newUser) {
                if (newUser.status === 'active') {
                    return comparePassword(res, user, newUser);
                }
                else {
                    return userStatus(res, newUser);
                }
            }
            else {
                ResponseService.failure(res, 'Unknown username or password');
            }
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function pulse(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, transaction, aUser, _a, user, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sequelize = models.sequelize;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _b.sent();
                        return [4 /*yield*/, User.findOne({
                                where: {
                                    id: req.decoded.id
                                },
                                include: [
                                    {
                                        model: Person
                                    }
                                ]
                            }, { transaction: transaction })];
                    case 3:
                        aUser = _b.sent();
                        if (!aUser) {
                            throw new Error('Unable to retrieve user.');
                        }
                        if (aUser.status !== 'active') {
                            throw new Error('User is not active.');
                        }
                        _a = generateToken(aUser, TOKEN_LIFESPAN), user = _a[0], token = _a[1];
                        return [4 /*yield*/, transaction.commit()];
                    case 4:
                        _b.sent();
                        loginSuccess(res, token, user);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_1, 403);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    return {
        login: login,
        pulse: pulse
    };
}
exports.default = LoginController;
//# sourceMappingURL=loginController.js.map