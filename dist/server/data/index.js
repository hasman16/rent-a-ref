"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var sequelize = null;
// 1 - admin1
// 2 - admin2
// 3 - organizer
// 4 - sub organizer
// 5 - referee
var users = [{
        email: 'admin1@rentaref.com',
        password: 'admin1',
        authorization: 1,
        enabled: true
    }, {
        email: 'admin2@rentaref.com',
        password: 'admin2',
        authorization: 2,
        enabled: true
    },
    {
        email: 'admin3@rentaref.com',
        password: 'admin3',
        authorization: 2,
        enabled: true
    },
    {
        email: 'org11@rentaref.com',
        password: 'organ11',
        authorization: 3,
        enabled: true
    }, {
        email: 'org22@rentaref.com',
        password: 'organ22',
        authorization: 4,
        enabled: true
    },
    {
        email: 'org33@rentaref.com',
        password: 'organ33',
        authorization: 4,
        enabled: true
    },
    {
        email: 'ref1@rentaref.com',
        password: 'referee1',
        authorization: 5,
        enabled: true
    }
];
var people = [
    {
        firstname: 'Rod',
        lastname: 'Test',
        email: 'admin1@rentaref.com',
        sex: 'm'
    },
    {
        firstname: 'Jane',
        lastname: 'Test',
        email: 'admin2@rentaref.com',
        sex: 'f'
    },
    {
        firstname: 'Bob',
        lastname: 'Test',
        email: 'admin3@rentaref.com',
        sex: 'm'
    },
    {
        firstname: 'Freda',
        lastname: 'Test',
        email: 'org11@rentaref.com',
        sex: 'f'
    },
    {
        firstname: 'Tom',
        lastname: 'Test',
        email: 'org22@rentaref.com',
        sex: 'm'
    },
    {
        firstname: 'Dick',
        lastname: 'Test',
        email: 'org33@rentaref.com',
        sex: 'm'
    },
    {
        firstname: 'Harry',
        lastname: 'Test',
        email: 'ref1@rentaref.com',
        sex: 'm'
    }
];
var sports = [{
        name: 'Soccer',
        duration: 90,
        periods: 2,
        referees: 3
    },
    {
        name: 'Rugby',
        duration: 80,
        periods: 2,
        referees: 3
    }];
function insertSports(Sport) {
    sports.forEach(function (sport) {
        Sport.create(sport);
    });
}
function insertPeople(User, Person) {
    var person = people.find(function (aPerson) {
        return aPerson.email === User.email;
    });
    if (person) {
        person['user_id'] = User.id;
        person['dob'] = (new Date()).getTime();
        return Person.create(person);
    }
}
function insertUser(models) {
    var User = models.User;
    var Person = models.Person;
    console.log('Attempting   to create users.');
    users.forEach(function (user) {
        bcrypt.hash(user.password, 10)
            .then(function (password) {
            user.password = password;
            return User.findOne({
                where: { email: user.email, password: user.password }
            });
        })
            .then(function (newUser) {
            if (!newUser) {
                return User.create(user);
            }
        })
            .then(function (aUser) {
            if (aUser) {
                return insertPeople(aUser, Person);
            }
        })
            .catch(function (error) {
            throw (error);
        });
    });
}
function insertData(models, doInsert) {
    if (doInsert === void 0) { doInsert = false; }
    if (doInsert) {
        sequelize = models.sequelize;
        sequelize.sync({
            force: true
        })
            .then(function () { return insertUser(models); })
            .then(function () { return insertSports(models.Sport); })
            .catch(function (error) {
            throw Error(error);
        });
    }
}
exports.default = insertData;
//# sourceMappingURL=index.js.map