import * as bcrypt from 'bcryptjs';

var sequelize = null;
var User = null;

var users = [{
  email: 'admin1@rentaref.com',
  password: 'admin1',
  authorization: 1
}, {
    email: 'admin2@rentaref.com',
    password: 'admin2',
    authorization: 2
  }];

function insertUser(User) {
  console.log('Attempting to create users');

  users.forEach(function(user) {
    User.findOne({
      where: { email: user.email, password: user.password }
    }).then((newUser) => {
      if (!newUser) {
        User.create(user)
          .catch((error) => {
            throw (error);
          });;
      }
    }).catch((error) => {
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
      .then(() => insertUser(models.User))
      .catch((error) => {
        throw Error(error);
      });
  }
}

export default insertData;
