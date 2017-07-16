import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export default function UserController(models, ResponseService) {
  const User = models.User;
  const attributes = ['id', 'email', 'authorization'];
  /*
    function getAttributes(authorization) {
      if (authorization === 1 || authorization ===2 ) {

      }
    }*/

  // Get all
  function getAll(req, res) {
    //const currentAttributes = getAttributes(req.decoded.authorization);

    User.findAll({
      attributes: attributes
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makeUser(newUser) {
    return {
      id: newUser.id,
      email: newUser.email,
      authorization: newUser.authorization
    };
  }

  function returnUser(res, newUser) {
    ResponseService.success(res, makeUser(newUser));
  }

  function create(req, res) {
    const sequelize = models.sequelize;
    const Person = models.Person;
    const aUser = {
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
      .then(userInDb => {
        if (userInDb) {
          ResponseService.failure(res, 'A user with that email address already exists.');
        } else {
          return bcrypt.hash(aUser.password, 10)
            .then(password => {
              const user = {
                email: aUser.email,
                password: password,
                authorization: aUser.authorization,
                enabled: false
              };

              return sequelize.transaction(function(t) {
                return User.create(user, { transaction: t })
                  .then(newUser => {
                    const person = {
                      firstname: aUser.firstname,
                      lastname: aUser.lastname,
                      user_id: newUser.id,
                      dob: Number(aUser.dob),
                      sex: aUser.sex
                    };
                    return Person.create(person, { transaction: t })
                      .then(newPerson => returnUser(res, newUser));
                  });
              });
            });
        }
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const user = makeUser(req.body);

    User.update(user, {
      where: {
        id: req.params.id
      }
    })
      .then(updatedUser => returnUser(res, updatedUser))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const user = makeUser(req.body);

    User.destroy(user)
      .then(result => ResponseService.success(res, 'User deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  function login(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    User.findOne({
      where: { email: user.email }
    }).then(function(newUser) {
      if (newUser) {
        return bcrypt.compare(user.password, newUser.password)
          .then(result => {
            if (result) {
              const user = makeUser(newUser);

              const token = jwt.sign(user, process.env.SECRET_TOKEN, {
                expiresIn: 1440 * 60
              });

              ResponseService.success(res, {
                success: true,
                message: 'Authorization success',
                token: token,
                accessLevel: newUser.authorization
              });

            } else {
              ResponseService.failure(res, 'Authorization failed');
            }
          });
      } else {
        ResponseService.failure(res, 'Authorization failed');
      }
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function logout(req, res) {
    const user = new Object(req.body);
  }

  return {
    login: login,
    logout: logout,
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    deleteOne: deleteOne
  }
}
