"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RegisterController(bcrypt, jwt, models, ResponseService, SendGridService) {
    var Address = models.Address;
    var Area = models.Area;
    var Lock = models.Lock;
    var Person = models.Person;
    var Phone = models.Phone;
    var User = models.User;
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
    function createUserPerson(req, res, aUser, password) {
        var sequelize = models.sequelize;
        var user = {
            email: aUser.email,
            authorization: 3,
            can_referee: aUser.can_referee,
            can_organize: aUser.can_organize,
            status: aUser.status
        };
        return sequelize.transaction(function (t) {
            return User.create(user, { transaction: t })
                .then(function (newUser) {
                var lock = {
                    attempts: 0,
                    passcode: '',
                    password: password,
                    user_id: newUser.id
                };
                return Lock.create(lock, { transaction: t })
                    .then(function () {
                    var person = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        gender: 'pending',
                        dob: new Date('1901'),
                        user_id: newUser.id
                    };
                    return Person.create(person, { transaction: t })
                        .then(function (newPerson) {
                        var hasPhone = /\d+/.test(req.body['phone']);
                        if (hasPhone) {
                            var phone = {
                                'number': String(req.body['phone']),
                                'description': 'other'
                            };
                            return Phone.create(phone, { transaction: t })
                                .then(function (newPhone) { return respondAndSendEmail(res, aUser.email); });
                        }
                        else {
                            respondAndSendEmail(res, aUser.email);
                        }
                    });
                });
            });
        });
    }
    function createNewUser(user) {
        var aUser = {
            email: user.email,
            password: user.password,
            authorization: 3,
            status: 'active',
            can_organize: 'no',
            can_referee: 'no'
        };
        var isOrganizer = String(user.role).trim();
        if (/^organizer$/ig.test(isOrganizer)) {
            aUser.can_referee = 'no';
            aUser.can_organize = 'pending';
        }
        else {
            aUser.can_referee = 'pending';
            aUser.can_organize = 'no';
        }
        return aUser;
    }
    function registerUser(req, res) {
        var aUser = createNewUser(req.body);
        User.findOne({
            where: { email: aUser.email }
        })
            .then(function (userInDb) {
            if (userInDb) {
                ResponseService.failure(res, 'A user with that email address already exists.');
            }
            else {
                return bcrypt.hash(aUser.password, 12)
                    .then(function (password) {
                    return createUserPerson(req, res, aUser, password);
                });
            }
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getProfile(req, res) {
        User.findOne({
            where: {
                id: req.params.user_id
            },
            include: [{
                    model: Person
                }, {
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
                }]
        }).then(function (result) { return ResponseService.success(res, result, 200); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getProfile: getProfile,
        registerUser: registerUser
    };
}
exports.default = RegisterController;
//# sourceMappingURL=registerController.js.map