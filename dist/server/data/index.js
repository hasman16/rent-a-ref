"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var sequelize = null;
// 1 - admin1
// 2 - admin2
// 3 - user
var users = [
    {
        email: 'admin1@rentaref.com',
        password: 'admin1',
        authorization: 1,
        status: 'active',
        can_referee: 'active',
        can_organize: 'active'
    },
    {
        email: 'admin2@rentaref.com',
        password: 'admin2',
        authorization: 2,
        status: 'active',
        can_referee: 'active',
        can_organize: 'active'
    },
    {
        email: 'admin3@rentaref.com',
        password: 'admin3',
        authorization: 2,
        status: 'active',
        can_referee: 'active',
        can_organize: 'active'
    },
    {
        email: 'org11@rentaref.com',
        password: 'organ11',
        authorization: 3,
        status: 'active',
        can_referee: 'active',
        can_organize: 'active'
    },
    {
        email: 'org22@rentaref.com',
        password: 'organ22',
        authorization: 3,
        status: 'active',
        can_referee: 'no',
        can_organize: 'active'
    },
    {
        email: 'org33@rentaref.com',
        password: 'organ33',
        authorization: 3,
        status: 'pending',
        can_referee: 'pending',
        can_organize: 'pending'
    },
    {
        email: 'ref1@rentaref.com',
        password: 'referee1',
        authorization: 3,
        status: 'active',
        can_referee: 'active',
        can_organize: 'no'
    },
    {
        email: 'ref2@rentaref.com',
        password: 'referee2',
        authorization: 3,
        status: 'active',
        can_referee: 'active',
        can_organize: 'no'
    },
    {
        email: 'pete@mailinator.com',
        password: 'petepete',
        authorization: 3,
        status: 'active',
        can_referee: 'active',
        can_organize: 'pending'
    },
    {
        email: 'penny@mailinator.com',
        password: 'penny1',
        authorization: 3,
        status: 'active',
        can_referee: 'pending',
        can_organize: 'active'
    },
    {
        email: 'ahmadou.mbouo@dstinc.com',
        password: 'passcode',
        authorization: 3,
        status: 'active',
        can_referee: 'pending',
        can_organize: 'no'
    }
];
var people = [
    {
        firstname: 'Eugene',
        lastname: 'Krabs',
        email: 'admin1@rentaref.com',
        gender: 'm'
    },
    {
        firstname: 'Squidward',
        lastname: 'Tenticles',
        email: 'admin2@rentaref.com',
        gender: 'm'
    },
    {
        firstname: 'Pearl',
        lastname: 'Krabs',
        email: 'admin3@rentaref.com',
        gender: 'f'
    },
    {
        firstname: 'Sandy',
        lastname: 'cheeks',
        email: 'org11@rentaref.com',
        gender: 'f'
    },
    {
        firstname: 'Spongebob',
        lastname: 'Squarepants',
        email: 'org22@rentaref.com',
        gender: 'm'
    },
    {
        firstname: 'Patrick',
        lastname: 'Star',
        email: 'org33@rentaref.com',
        gender: 'm'
    },
    {
        firstname: 'Sheldon',
        lastname: 'Plankton',
        email: 'ref1@rentaref.com',
        gender: 'm'
    },
    {
        firstname: 'Mrs',
        lastname: 'Puff',
        email: 'ref2@rentaref.com',
        gender: 'f'
    },
    {
        firstname: 'Peter',
        lastname: 'Perfect',
        email: 'pete@mailinator.com',
        gender: 'm'
    },
    {
        firstname: 'Penelope',
        lastname: 'Pitstop',
        email: 'penny@mailinator.com',
        gender: 'f'
    },
    {
        firstname: 'Ahmadou',
        lastname: 'Ndoung',
        email: 'ahmadou.mbouo@dstinc.com',
        gender: 'm'
    }
];
var sports = [
    {
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
    }
];
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
        person['dob'] = new Date().getTime();
        return Person.create(person);
    }
}
function insertLock(user, password, models) {
    var Lock = models.Lock;
    Lock.create({
        attempts: 0,
        password: password,
        passcode: null,
        user_id: user.id
    });
}
function insertUser(models) {
    var User = models.User;
    var Person = models.Person;
    console.log('Attempting   to create users.');
    users.forEach(function (user) {
        bcrypt
            .hash(user.password, 10)
            .then(function (password) {
            user.password = password;
            return User.findOne({
                where: { email: user.email }
            });
        })
            .then(function (newUser) {
            if (!newUser) {
                var password_1 = user.password;
                return User.create(user).then(function (aUser) {
                    insertLock(aUser, password_1, models);
                    return aUser;
                });
            }
        })
            .then(function (aUser) {
            if (aUser) {
                insertPeople(aUser, Person);
            }
        })
            .catch(function (error) {
            console.log('error;', error);
            throw error;
        });
    });
}
function insertData(models, doInsert) {
    if (doInsert === void 0) { doInsert = false; }
    if (doInsert) {
        sequelize = models.sequelize;
        sequelize
            .sync({
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