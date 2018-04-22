"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring = require("randomstring");
function passwordController(bcrypt, jwt, models, ResponseService, SendGridService) {
    var User = models.User;
    var Lock = models.Lock;
    function unlockUser(user_id, password) {
        var sequelize = models.sequelize;
        var Op = sequelize.Op;
        return sequelize.transaction(function (t) {
            return User.update({
                status: 'active'
            }, {
                where: (_a = {
                        id: user_id
                    },
                    _a[Op.or] = [
                        {
                            status: 'active'
                        },
                        {
                            status: 'locked'
                        }
                    ],
                    _a)
            }, { transation: t }).then(function (user) {
                return Lock.update({
                    attempts: 0,
                    passcode: null,
                    passcode_age: null,
                    password: password
                }, {
                    where: {
                        user_id: user_id
                    }
                }, { transation: t });
            });
            var _a;
        });
    }
    function resetSuccess(res) {
        ResponseService.success(res, {
            success: true,
            message: 'Password has been reset successfully.'
        }, 201);
    }
    function generatePassword(res, user, newUser) {
        return bcrypt.hash(user.password1, 12).then(function (password) {
            if (user.password1 === user.password2) {
                return unlockUser(newUser.id, password).then(function () { return resetSuccess(res); });
            }
            else {
                ResponseService.failure(res, 'Password1 and Password2 do not match.', 403);
            }
        });
    }
    function changepassword(req, res) {
        var user = {
            id: req.params.user_id,
            password1: req.body.password1,
            password2: req.body.password2
        };
        //console.log('changepassword:', user);
        User.findOne({
            where: { id: user.id },
            include: [
                {
                    model: Lock
                }
            ]
        })
            .then(function (newUser) {
            var message = 'Unknown user.';
            if (newUser) {
                switch (newUser.status) {
                    case 'active':
                        return generatePassword(res, user, newUser);
                    case 'banned':
                        message = 'Account banned by the Admin.';
                        break;
                    case 'locked':
                        message = 'Account is locked check your mail.';
                        break;
                    case 'suspended':
                        message = 'Account has been suspended by Admin.';
                        break;
                    default:
                        message = 'Could not change password.';
                        break;
                }
            }
            ResponseService.failure(res, message);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function comparePasscode(res, user, newUser) {
        var lock = newUser.lock;
        return bcrypt
            .compare(user.passcode, lock.passcode)
            .then(function (result) {
            if (result) {
                return generatePassword(res, user, newUser);
            }
            else {
                ResponseService.failure(res, 'Invalid Passcode.', 403);
            }
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function resetpassword(req, res) {
        var user = {
            email: req.body.email,
            password1: req.body.password1,
            password2: req.body.password2,
            passcode: req.body.passcode
        };
        User.findOne({
            where: { email: user.email },
            include: [
                {
                    model: Lock
                }
            ]
        })
            .then(function (newUser) {
            var message = 'Unknown username.';
            if (newUser) {
                var status_1 = newUser.status;
                if (status_1 === 'locked' || status_1 === 'active') {
                    return comparePasscode(res, user, newUser);
                }
                else if (status_1 === 'suspended') {
                    message = 'Account has been suspended by Admin.';
                }
                else {
                    message = 'Could not reset password.';
                }
            }
            ResponseService.failure(res, message);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function sendPasscode(res, user) {
        var passcode = randomstring.generate();
        var content = 'You are receiving this email because someone (presumably you), reported a lost password at http://www.ref-a-ref.com.';
        content += "\n\n If it wasn't you, please ignore this email.";
        content +=
            '\n\n If it was you, however, click the link below to reset your ';
        content +=
            '\n\n password.You can also copy and paste the link into your browser address bar.';
        content += '\n\n ';
        content += 'Use the passcode to reset your password.';
        content += '\n\n ' + passcode;
        content += '\n\n ';
        content +=
            '\n\n Or you can copy the link below to launch the reset password page';
        content += '\n\n http://localhost:4200/reset?passcode=' + passcode;
        bcrypt
            .hash(passcode, 12)
            .then(function (newPasscode) {
            return Lock.update({
                passcode: newPasscode,
                passcode_age: new Date()
            }, {
                where: {
                    user_id: user.id
                }
            });
        })
            .then(function () {
            return SendGridService.sendEmail({
                to: user.email,
                from: 'do-not-reply@rentaref.com',
                subject: 'Reset Password.',
                content: content
            });
        })
            .then(function () {
            ResponseService.success(res, {
                success: true,
                message: 'A new passcode sent to ' + user.email + '.'
            }, 201);
        });
    }
    function forgotpassword(req, res) {
        var user = {
            email: req.body.email
        };
        User.findOne({
            where: { email: user.email },
            include: [
                {
                    model: Lock
                }
            ]
        })
            .then(function (newUser) {
            var message = 'Unknown username.';
            if (newUser) {
                var status_2 = newUser.status;
                if (status_2 === 'active' || status_2 === 'locked') {
                    return sendPasscode(res, newUser);
                }
                else if (newUser.status === 'suspended') {
                    message = 'Account has been suspended by Admin.';
                }
                else {
                    message = 'Could not generate passcode.';
                }
            }
            ResponseService.failure(res, message);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        changepassword: changepassword,
        forgotpassword: forgotpassword,
        resetpassword: resetpassword
    };
}
exports.default = passwordController;
//# sourceMappingURL=passwordController.js.map