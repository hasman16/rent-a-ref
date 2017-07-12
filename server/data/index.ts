import * as bcrypt from 'bcryptjs';

var sequelize = null;

//1 - admin1
//2 - admin2
//3 - organizer
//4 - sub organizer
//5 - referee

var users = [{
  email: 'admin1@rentaref.com',
  password: 'admin1',
  authorization: 1
}, {
    email: 'admin2@rentaref.com',
    password: 'admin2',
    authorization: 2
  },
  {
    email: 'admin3@rentaref.com',
    password: 'admin3',
    authorization: 2
  },
  {
    email: 'org11@rentaref.com',
    password: 'organ11',
    authorization: 3
  }, {
    email: 'org22@rentaref.com',
    password: 'organ22',
    authorization: 4
  },
  {
    email: 'org33@rentaref.com',
    password: 'organ33',
    authorization: 4
  },
  {
    email: 'ref1@rentaref.com',
    password: 'referee1',
    authorization: 5
  }
];
var people = [
  {
    firstname: "Rod",
    lastname: "Test",
    email: "admin1@rentaref.com"
  },
  {
    firstname: "Jane",
    lastname: "Test",
    email: "admin2@rentaref.com"
  },
  {
    firstname: "Bob",
    lastname: "Test",
    email: "admin3@rentaref.com"
  },
  {
    firstname: "Freda",
    lastname: "Test",
    email: 'org11@rentaref.com'
  },
  {
    firstname: "Tom",
    lastname: "Test",
    email: 'org22@rentaref.com',
  },
  {
    firstname: "Dick",
    lastname: "Test",
    email: 'org33@rentaref.com'
  },
  {
    firstname: "Harry",
    lastname: "Test",
    email: 'ref1@rentaref.com',
  }
];

var sports = [{
  name: "Soccer",
  duration: 90,
  periods: 2,
  referees: 3
},
  {
    name: "Rugby",
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
  var person = people.find(function(person) {
    return person.email == User.email;
  });

  if (person) {
    person["user_id"] = User.id;
    return Person.create(person);
  }
}

function insertUser(models) {
  var User = models.User;
  var Person = models.Person;
  console.log('Attempting   to create users asdfasd');

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
      .then(user => {
        if (user) {
          return insertPeople(user, Person);
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
