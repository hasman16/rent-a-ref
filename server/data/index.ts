import * as bcrypt from 'bcryptjs';

var sequelize = null;
var User = null;
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
    email: 'org1@rentaref.com',
    password: 'organ11',
    authorization: 3
  }, {
      email: 'org22@rentaref.com',
      password: 'organ22',
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
    firstname: "Michael",
    lastname: "Test"
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

function insertPeople(Person) {
  people.forEach(function(person) {
    Person.create(person);
  });
}

function insertUser(User) {
  console.log('Attempting to create users');

  users.forEach(function(user) {
    bcrypt.hash(user.password, 10)
    .then(password=> {
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
    .catch((error) => {
      throw(error);
    });

  });
}

function insertData(models, doInsert: Boolean = false) {
  if (doInsert) {
    sequelize = models.sequelize;

    sequelize.sync({
      force: true
    })
      .then(() => insertUser(models.User))
      .then(() => insertSports(models.Sport))
      .then(() => insertSports(models.Person))
      .catch((error) => {
        throw Error(error);
      });
  }
}

export default insertData;
