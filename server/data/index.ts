import * as bcrypt from 'bcryptjs';

let sequelize = null;

// 1 - admin1
// 2 - admin2
// 3 - organizer
// 4 - sub organizer
// 5 - referee

const users = [{
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

const people = [
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

const sports = [{
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
  sports.forEach(function(sport) {
    Sport.create(sport);
  });
}

function insertPeople(User, Person) {
  let person = people.find(function(aPerson) {
    return aPerson.email === User.email;
  });

  if (person) {
    person['user_id'] = User.id;
    person['dob'] = (new Date()).getTime();
    return Person.create(person);
  }
}

function insertUser(models) {
  const User = models.User;
  const Person = models.Person;
  console.log('Attempting   to create users.');

  users.forEach(function(user) {
    bcrypt.hash(user.password, 10)
      .then(password => {
        user.password = password;
        return User.findOne({
          where: { email: user.email, password: user.password }
        });
      })
      .then((newUser) => {
        if (!newUser) {
          return User.create(user);
        }
      })
      .then(aUser => {
        if (aUser) {
          return insertPeople(aUser, Person);
        }
      })
      .catch((error) => {
        throw (error);
      });

  });
}

function insertData(models, doInsert: Boolean = false) {
  if (doInsert) {
    sequelize = models.sequelize;

    sequelize.sync({
      force: true
    })
      .then(() => insertUser(models))
      .then(() => insertSports(models.Sport))
      .catch((error) => {
        throw Error(error);
      });
  }
}

export default insertData;
