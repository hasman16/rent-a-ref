import * as randomstring from 'randomstring';

export default function LoginController(bcrypt, jwt, models, ResponseService, SendGridService) {
  const User = models.User;
  const Lock = models.Lock;
  const Person = models.Person;

  function lockUser(user_id) {
    return User.update({
      status: 'locked'
    }, {
        where: {
          id: user_id,
          status: 'active'
        }
      });
  }

  function unlockUser(user_id) {
    User.update({
      status: 'active'
    }, {
        where: {
          id: user_id,
          status: 'locked'
        }
      });
  }

  function updateLock(user_id, callback) {
    function doUpdate(lock) {
      return Lock.update({
        attempts: lock.attempts,
        passcode: lock.passcode
      }, {
          where: {
            user_id: user_id
          }
        });
    }

    return Lock.findOne({
      where: {
        user_id: user_id
      }
    })
      .then(newLock => {
        let lock = callback(newLock.attempts, newLock.passcode);
        let updatePromise;

        if (lock.attempts >= 5) {
          updatePromise = bcrypt.hash(lock.passcode, 10)
            .then(passcode => {
              lock.passcode = passcode;
              return doUpdate(lock);
            })
            .then(() => {
              lockUser(user_id);
            });
        } else {
          updatePromise = doUpdate(lock);
        }

        return updatePromise;
      })
  }

  function failedLogin(res, user) {
    let dummy = 0;

    function callback(attempts, passcode) {
      attempts += 1;

      if (attempts >= 5) {
        attempts = 5;
        passcode = randomstring.generate();
        let content = "There was more than 5 unsuccessful login attempts on your";
        content += " account. Use the passcode to reset your password: "
        content += "\n\n " + passcode;

        SendGridService.sendEmail({
          to: user.email,
          from: 'admin@rentaref.com',
          subject: 'Account Locked.',
          content: content
        });
      }
      dummy = attempts;
      return {
        attempts,
        passcode
      };
    }

    return updateLock(user.id, callback)
      .then(function() {
        const message = 'Authorization failed';
        res.status(403).json({
          success: false,
          message: message,
          attempts: dummy
        });
      });
  }

  function loginSuccess(res, token, user) {
    ResponseService.success(res, {
      success: true,
      message: 'Authorization success',
      token: token,
      user: user
    }, 201);
  }

  function comparePassword(res, user, newUser) {
    const lock = newUser.lock;

    return bcrypt.compare(user.password, lock.password)
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
          };

          const token = jwt.sign(user, process.env.SECRET_TOKEN, {
            expiresIn: 1440 * 60
          });

          return updateLock(user.id, function() {
            return {
              attempts: 0,
              passcode: null
            };
          }).then(() => {
            loginSuccess(res, token, user);
          });

        } else {
          return failedLogin(res, newUser);
        }
      })
      .catch(error => failedLogin(res, newUser));
  }

  function userStatus(res, newUser) {
    let message = 'Contact Admin to enabled Account.'
    switch (newUser.status) {
      case 'suspended':
        message = 'Account suspended by the Admin.';
        break;
      case 'locked':
        message = 'Login is locked. Reset password.';
        break;
      case 'pending':
        message = 'Account is awaiting Admin approval.';
        break;
    }
    ResponseService.failure(res, message);
  }

  function login(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    User.findOne({
      where: { email: user.email },
      include: [{
        model: Person
      }, {
          model: Lock
        }]
    }).then(function(newUser) {
      if (newUser) {
        if (newUser.status === 'active') {
          return comparePassword(res, user, newUser);
        } else {
          return userStatus(res, newUser);
        }
      } else {
        ResponseService.failure(res, 'Unknown username or password');
      }
    })
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    login
  }
}
