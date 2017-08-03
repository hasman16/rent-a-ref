
export default function UserController(bcrypt, jwt, models, ResponseService, SendGridService) {
  const User = models.User;
  const attributes = ['id', 'email', 'authorization', 'can_organize', 'can_referee', 'status'];

  function getAll(req, res) {
    User.findAll({
      attributes: attributes,
    })
      .then(results => ResponseService.successCollection(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    User.findOne({
      where: {
        id: req.params.user_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
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

  function returnUser(res, user, status = 200) {
    let newUser = makeUser(user);
    newUser["id"] = user.id;
    ResponseService.success(res, newUser, status);
  }

  function createNewUser(user) {
    let aUser = {
      email: user.email,
      password: user.password,
      authorization: 3,
      status: 'active',
      can_organize: 'no',
      can_referee: 'no'
    };
    const isOrganizer = String(user.role).trim();

    if (/^organizer$/ig.test(isOrganizer)) {
      aUser.can_referee = 'no';
      aUser.can_organize = 'pending';
    } else {
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
      to: ['hasman16@gmail.com', 'smylydon@gmail.com'],
      from: 'smylydon@gmail.com',
      subject: 'User registered',
      content: 'Hello from sendgrid'
    });
  }

  function create(req, res) {
    const sequelize = models.sequelize;
    const Phone = models.Phone;
    const aUser = createNewUser(req.body);

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
                    const Person = models.Person;
                    const person = {
                      firstname: req.body.firstname,
                      lastname: req.body.lastname,
                      gender: 'pending',
                      dob: new Date('1901'),
                      user_id: newUser.id
                    }

                    return Person.create(person, { transaction: t })
                      .then(function(newPerson) {
                        const hasPhone = /\d+/.test(req.body["phone"]);

                        if (hasPhone) {
                          const phone = {
                            "number": String(req.body["phone"]),
                            "description": "other"
                          };

                          return Phone.create(phone, { transaction: t })
                            .then(newPhone => respondAndSendEmail(res));
                        } else {
                          respondAndSendEmail(res);
                        }
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
        id: req.params.user_id
      }
    })
      .then(updatedUser => returnUser(res, updatedUser, 201))
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
    const user = makeUser(req.body);
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
