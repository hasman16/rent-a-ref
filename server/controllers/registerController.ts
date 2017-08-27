import * as randomstring from 'randomstring';

export default function RegisterController(bcrypt, jwt, models, ResponseService, SendGridService) {
  const User = models.User;
  const Lock = models.Lock;
  const Person = models.Person;
  const Phone = models.Phone;
  const Address = models.Address;

  function respondAndSendEmail(res, email) {
    ResponseService.success(res, {
      success: true,
      message: 'User created successfully'
    }, 201);

    SendGridService.sendEmail({
      to: email,
      from: 'admin@rentaref.com',
      subject: 'User registered',
      content: 'Your account was set up successfully. The admin will review and enable your account.'
    });
  }

  function createUserPerson(req, res, aUser, password) {
    const sequelize = models.sequelize;

    const user = {
      email: aUser.email,
      authorization: 3,
      can_referee: aUser.can_referee,
      can_organize: aUser.can_organize,
      status: aUser.status
    };

    return sequelize.transaction(function(t) {
      return User.create(user, { transaction: t })
        .then(newUser => {
          const lock = {
            attempts: 0,
            passcode: '',
            password: password,
            user_id: newUser.id
          };
          return Lock.create(lock, { transaction: t })
            .then(() => {
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
                      .then(newPhone => respondAndSendEmail(res, aUser.email));
                  } else {
                    respondAndSendEmail(res, aUser.email);
                  }
                });
            });
        });
    });
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

  function registerUser(req, res) {
    const aUser = createNewUser(req.body);

    User.findOne({
      where: { email: aUser.email }
    })
      .then(userInDb => {
        if (userInDb) {
          ResponseService.failure(res, 'A user with that email address already exists.');
        } else {
          return bcrypt.hash(aUser.password, 12)
            .then(password => {
              return createUserPerson(req, res, aUser, password);
            });
        }
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function getProfile(req, res) {
    User.findOne({
      where: {
        id: req.params.user_id
      },
      include: [{
        model: Person
      }, {
        model: Address,
        through: {
          attributes: []
        }
      },
      {
        model: Phone,
        through: {
          attributes: []
        }
      }]
    }).then((result) => ResponseService.success(res, result, 200))
      .catch(error => ResponseService.exception(res, error))
  }

  return {
    getProfile,
    registerUser
  }
}
