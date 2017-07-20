"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function UserController(bcrypt, jwt, models, ResponseService) {
    var User = models.User;
    var attributes = ['id', 'email', 'authorization'];
    function getAll(req, res) {
        User.findAll({
            attributes: attributes,
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        User.findOne({
            where: {
                id: req.params.id
            },
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function makeUser(newUser) {
        return {
            id: newUser.id,
            email: newUser.email,
            authorization: newUser.authorization
        };
    }
    function returnUser(res, newUser, status) {
        if (status === void 0) { status = 200; }
        ResponseService.success(res, makeUser(newUser), status);
    }
    function create(req, res) {
        var sequelize = models.sequelize;
        var Person = models.Person;
        var aUser = {
            email: req.body.email,
            password: req.body.password,
            authorization: req.body.authorization || 5,
            enabled: false,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            sex: req.body.sex
        };
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
                        enabled: false
                    };
                    return sequelize.transaction(function (t) {
                        return User.create(user, { transaction: t })
                            .then(function (newUser) {
                            var person = {
                                firstname: aUser.firstname,
                                lastname: aUser.lastname,
                                user_id: newUser.id,
                                dob: Number(aUser.dob),
                                sex: aUser.sex
                            };
                            return Person.create(person, { transaction: t })
                                .then(function (newPerson) { return returnUser(res, newUser); }, 201);
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
                id: req.params.id
            }
        })
            .then(function (updatedUser) { return returnUser(res, updatedUser); }, 201)
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
                            person_id: person.id
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