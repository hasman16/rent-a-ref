"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function UserController(bcrypt, jwt, models, ResponseService, SendGridService) {
    var User = models.User;
    var attributes = ['id', 'email', 'authorization', 'can_organize', 'can_referee', 'status'];
    function getAll(req, res) {
        User.findAll({
            attributes: attributes,
        })
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        User.findOne({
            where: {
                id: req.params.user_id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makeUser(newUser) {
        return {
            email: newUser.email,
            authorization: newUser.authorization,
            can_organize: newUser.can_organize,
            can_referee: newUser.can_referee,
            status: newUser.status
        };
    }
    function returnUser(res, user, status) {
        if (status === void 0) { status = 200; }
        var newUser = makeUser(user);
        newUser["id"] = user.id;
        ResponseService.success(res, newUser, status);
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
    function respondAndSendEmail(res) {
        ResponseService.success(res, {
            success: true,
            message: 'User created successfully'
        }, 201);
        SendGridService.sendEmail({
            to: ['hasman16@gmail', 'smylydon@gmail.com'],
            from: 'smylydon@gmail.com',
            subject: 'User registered',
            content: 'Hello from sendgrid'
        });
    }
    function create(req, res) {
        var sequelize = models.sequelize;
        var Phone = models.Phone;
        var aUser = createNewUser(req.body);
        User.findOne({
            where: { email: aUser.email }
        })
            .then(function (userInDb) {
            if (userInDb) {
                ResponseService.failure(res, 'A user with that email address already exists.');
            }
            else {
                return bcrypt.hash(aUser.password, 10)
                    .then(function (password) {
                    var user = {
                        email: aUser.email,
                        password: password,
                        authorization: aUser.authorization,
                        can_referee: aUser.can_referee,
                        can_organize: aUser.can_organize,
                        status: aUser.status
                    };
                    return sequelize.transaction(function (t) {
                        return User.create(user, { transaction: t })
                            .then(function (newUser) {
                            var Person = models.Person;
                            var person = {
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                gender: 'pending',
                                dob: new Date('1901'),
                                user_id: newUser.id
                            };
                            return Person.create(person, { transaction: t })
                                .then(function (newPerson) {
                                var hasPhone = /\d+/.test(req.body["phone"]);
                                if (hasPhone) {
                                    var phone = {
                                        "number": String(req.body["phone"]),
                                        "description": "other"
                                    };
                                    return Phone.create(phone, { transaction: t })
                                        .then(function (newPhone) { return respondAndSendEmail(res); });
                                }
                                else {
                                    respondAndSendEmail(res);
                                }
                            });
                        });
                    });
                });
            }
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var user = makeUser(req.body);
        User.update(user, {
            where: {
                id: req.params.user_id
            }
        })
            .then(function (updatedUser) { return returnUser(res, updatedUser, 201); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var user = makeUser(req.body);
        User.destroy(user)
            .then(function (result) { return ResponseService.success(res, 'User deleted'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function login(req, res) {
        var Person = models.Person;
        var user = {
            email: req.body.email,
            password: req.body.password
        };
        User.findOne({
            where: { email: user.email },
            include: [{
                    model: Person
                }]
        }).then(function (newUser) {
            if (newUser) {
                return bcrypt.compare(user.password, newUser.password)
                    .then(function (result) {
                    if (result) {
                        var person = newUser.person;
                        var user_1 = {
                            id: newUser.id,
                            email: newUser.email,
                            accessLevel: newUser.authorization,
                            firstname: person.firstname,
                            lastname: person.lastname,
                            can_referee: newUser.can_referee,
                            can_organize: newUser.can_organize,
                            status: newUser.status
                        };
                        ;
                        var token = jwt.sign(user_1, process.env.SECRET_TOKEN, {
                            expiresIn: 1440 * 60
                        });
                        ResponseService.success(res, {
                            success: true,
                            message: 'Authorization success',
                            token: token,
                            user: user_1
                        }, 201);
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
        var user = makeUser(req.body);
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