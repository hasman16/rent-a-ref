
export default function UserController(bcrypt, jwt, models, ResponseService) {
  const User = models.User;
  const attributes = ['id', 'email', 'authorization'];

  function getAll(req, res) {
    User.findAll({
      attributes: attributes,
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
      authorization: newUser.authorization,
      can_organize: newUser.can_organize,
      can_referee: newUser.can_referee,
      status: newUser.status
    };
  }

  function returnUser(res, newUser, status = 200) {
    ResponseService.success(res, makeUser(newUser), status);
  }

  function createNewUser(user) {
    let aUser = {
      email: user.email,
      password: user.password,
      authorization: 3,
      status: 'active',
      can_organize: 'no',
      can_referee: 'no',
      firstname: user.firstname,
      lastname: user.lastname,
      dob: user.dob,
      sex: user.sex
    };
    aUser.can_referee = user.can_referee ? 'pending' : aUser.can_referee;
    aUser.can_organize = user.can_organize ? 'active' : 'no';

    return aUser;
  }

  function create(req, res) {
    const sequelize = models.sequelize;
    const Person = models.Person;
    const Phone = models.Phone;
    const aUser = createNewUser(req);

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
                can_referee: aUser.can_referee,
                can_organize: aUser.can_organize,
                status: aUser.status
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
                      .then(newPerson => {
                        /*
                        const phone = {
                          "number": req.body.phone_number,
                          "description": req.body.phone_description
                        };
                        Phone.create(phone, { transaction: t })
                          .then(newPhone => returnUser(res, newUser)); */
                        ResponseService.success(res, {
                          success: true,
                          message: 'User created successfully'
                        }, 201);
                      });
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
      .then(updatedUser => returnUser(res, updatedUser), 201)
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const user = makeUser(req.body);

    User.destroy(user)
      .then(result => ResponseService.success(res, 'User deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  function login(req, res) {
    const Person = models.Person;
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    User.findOne({
      where: { email: user.email },
      include: [{
        model: Person
      }]
    }).then(function(newUser) {
      if (newUser) {
        return bcrypt.compare(user.password, newUser.password)
          .then(result => {
            if (result) {
              const person = newUser.person;
              const user = {
                id: newUser.id,
                email: newUser.email,
                accessLevel: newUser.authorization,
                firstname: person.firstname,
                lastname: person.lastname,
                can_referee: newUser.can_referee,
                can_organize: newUser.can_organize,
                status: newUser.status
              };;

              const token = jwt.sign(user, process.env.SECRET_TOKEN, {
                expiresIn: 1440 * 60
              });

              ResponseService.success(res, {
                success: true,
                message: 'Authorization success',
                token: token,
                user: user
              }, 201);

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
