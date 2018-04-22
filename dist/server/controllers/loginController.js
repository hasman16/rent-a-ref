"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring = require("randomstring");
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
        //console.log('comparePassword:', user.password, lock.password);
        return bcrypt
            .compare(user.password, lock.password)
            .then(function (result) {
            if (result) {
                //console.log('got result');
                var person = newUser.person;
                var user_1 = {
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
                //console.log('create token:', user, process.env.SECRET_TOKEN);
                var token_1 = jwt.sign(user_1, process.env.SECRET_TOKEN, {
                    expiresIn: 1440 * 60
                });
                //console.log('go updateLock');
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
        //console.log('try login:', user.email);
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
            //console.log('new User:', newUser);
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
    return {
        login: login
    };
}
exports.default = LoginController;
//# sourceMappingURL=loginController.js.map