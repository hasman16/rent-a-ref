import * as request from 'request-promise';
import * as randomstring from 'randomstring';
import * as _ from 'lodash';

interface Payload {
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string,
  authorization?: string,
  role?: string;
  phone?: string;
  status?: string,
  can_organize?: string,
  can_referee?: string,
  captcha?: string
};

//https://www.npmjs.com/package/ng-recaptcha
export default function RegisterController(bcrypt, jwt, models, ResponseService, SendGridService) {
  const Address = models.Address;
  const Area = models.Area;
  const Lock = models.Lock;
  const Person = models.Person;
  const Phone = models.Phone;
  const User = models.User;

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

  function getNewUserFromPayload(payload) {
    const role = String(payload.role).trim();
    const isOrganizer = /^organizer$/ig.test(role);
    return {
      email: payload.email,
      authorization: 3,
      status: 'active',
      can_organize: isOrganizer ? 'pending': 'no',
      can_referee: isOrganizer ? 'no': 'pending'
    };
  }

  function createUserPhone(t, payload, user_id) {
    const phone = {
      'number': String(payload.phone),
      'description': 'other'
    };

    return Phone.create(phone, { transaction: t })
      .then(newPhone => {
        const model = { user_id: user_id, phone_id: newPhone.id };
        return models.UserPhone.create(model, { transaction: t})
      });
  }

  function createUserPerson(req, res, payload, password) {
    const sequelize = models.sequelize;
    const user = getNewUserFromPayload(payload);
    let newUserId;

    return sequelize.transaction((t) => {
      return User.create(user, { transaction: t })
        .then(newUser => {
          const lock = {
            attempts: 0,
            passcode: '',
            password: password,
            user_id: newUser.id
          };
          newUserId = newUser.id;
          return Lock.create(lock, { transaction: t });
        })
        .then((newLock) => {
          const person = {
            firstname: payload.firstname,
            lastname: payload.lastname,
            gender: 'pending',
            dob: new Date('1901'),
            user_id: newUserId
          }
          return Person.create(person, { transaction: t });
        })
        .then((newPerson) => {
          const hasPhone = /\d+/.test(payload.phone);

          if (hasPhone) {
            return createUserPhone(t, payload, newUserId)
              .then(() => respondAndSendEmail(res, payload.email));
          } else {
            respondAndSendEmail(res, payload.email);
          }
        });
    });
  }

  function registerUser(req, res) {
    const payload =  <Payload>ResponseService.getItemFromBody(req);
    const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;
    const options = {
      uri: 'https://google.com/recaptcha/api/siteverify',
      qs: {
        secret: RECAPTCHA_KEY, 
        response: payload.captcha,
        ip: req.connection.remoteAddress
      },
      json: true 
    };

    if (_.get(payload,'captcha','') === '') {
      ResponseService.exception(res, 'Missing recaptcha.', 403);
    } else {
      request(options)
        .then((response) => {
          return User.findOne({
            where: { email: payload.email }
          });
        })
        .then(userInDb => {
          if (userInDb) {
            ResponseService.failure(res, 'A user with that email address already exists.');
          } else {
            return bcrypt.hash(payload.password, 12);
          }
        })
        .then(password => {
          return createUserPerson(req, res, payload, password);
        })
        .catch(error => ResponseService.exception(res, error));
    }
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
        model: Area
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
  };
}
