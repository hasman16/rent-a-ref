"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request-promise");
var _ = require("lodash");
//https://www.npmjs.com/package/ng-recaptcha
function RegisterController(bcrypt, jwt, models, ResponseService, SendGridService) {
    var Address = models.Address;
    var Area = models.Area;
    var Lock = models.Lock;
    var Person = models.Person;
    var Phone = models.Phone;
    var User = models.User;
    var Image = models.Image;
    function respondAndSendEmail(res, email) {
        ResponseService.success(res, {
            success: true,
            message: 'User created successfully'
        }, 201);
        SendGridService.sendEmail({
            to: email,
            from: 'admin@rentaref.com',
            subject: 'User registered',
            content: 'Your account was set up successfully. The admin will review and enable your account.'
        });
    }
    function getNewUserFromPayload(payload) {
        var role = String(payload.role).trim();
        var isOrganizer = /^organizer$/gi.test(role);
        return {
            email: payload.email,
            authorization: 3,
            status: 'active',
            can_organize: isOrganizer ? 'pending' : 'no',
            can_referee: isOrganizer ? 'no' : 'pending'
        };
    }
    function createUserPhone(t, payload, user_id) {
        var phone = {
            number: String(payload.phone),
            description: 'other'
        };
        return Phone.create(phone, { transaction: t }).then(function (newPhone) {
            var model = { user_id: user_id, phone_id: newPhone.id };
            return models.UserPhone.create(model, { transaction: t });
        });
    }
    function createUserPerson(req, res, payload, password) {
        var sequelize = models.sequelize;
        var user = getNewUserFromPayload(payload);
        var newUserId;
        return sequelize.transaction(function (t) {
            return User.create(user, { transaction: t })
                .then(function (newUser) {
                var lock = {
                    attempts: 0,
                    passcode: '',
                    password: password,
                    user_id: newUser.id
                };
                newUserId = newUser.id;
                return Lock.create(lock, { transaction: t });
            })
                .then(function (newLock) {
                var person = {
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    gender: 'pending',
                    dob: new Date('1901'),
                    user_id: newUserId
                };
                return Person.create(person, { transaction: t });
            })
                .then(function (newPerson) {
                var hasPhone = /\d+/.test(payload.phone);
                if (hasPhone) {
                    return createUserPhone(t, payload, newUserId).then(function () {
                        return respondAndSendEmail(res, payload.email);
                    });
                }
                else {
                    respondAndSendEmail(res, payload.email);
                }
            });
        });
    }
    function registerUser(req, res) {
        var payload = ResponseService.getItemFromBody(req);
        var RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;
        var options = {
            uri: 'https://google.com/recaptcha/api/siteverify',
            qs: {
                secret: RECAPTCHA_KEY,
                response: payload.captcha,
                ip: req.connection.remoteAddress
            },
            json: true
        };
        if (_.get(payload, 'captcha', '') === '') {
            ResponseService.exception(res, 'Missing recaptcha.', 403);
        }
        else {
            request(options)
                .then(function (response) {
                return User.findOne({
                    where: { email: payload.email }
                });
            })
                .then(function (userInDb) {
                if (userInDb) {
                    ResponseService.failure(res, 'A user with that email address already exists.');
                }
                else {
                    return bcrypt.hash(payload.password, 12);
                }
            })
                .then(function (password) {
                return createUserPerson(req, res, payload, password);
            })
                .catch(function (error) { return ResponseService.exception(res, error); });
        }
    }
    function getProfile(req, res) {
        User.findOne({
            where: {
                id: req.params.user_id
            },
            include: [
                {
                    model: Person
                },
                {
                    model: Address,
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Area
                },
                {
                    model: Phone,
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Image,
                    through: {
                        attributes: []
                    }
                }
            ]
        })
            .then(function (result) { return ResponseService.success(res, result, 200); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getProfile: getProfile,
        registerUser: registerUser
    };
}
exports.default = RegisterController;
//# sourceMappingURL=registerController.js.map