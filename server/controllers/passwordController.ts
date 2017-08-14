import * as randomstring from 'randomstring';

export default function passwordController(bcrypt, jwt, models, ResponseService, SendGridService) {
  const User = models.User;
  const Lock = models.Lock;

  function unlockUser(user_id, password) {
    const sequelize = models.sequelize;

    return sequelize.transaction(function(t) {
      User.update({
        status: 'active'
      }, {
          where: {
            id: user_id,
            $or: [{
              status: 'active'
            },
            {
              status: 'locked'
            }]
          }
        }, { transation: t })
        .then((user) => {
          return Lock.update({
            attempts: 0,
            passcode: null,
            password: password
          }, {
              where: {
                user_id: user_id
              }
            }, { transation: t });
        });
    });
  }

  function resetSuccess(res) {
    ResponseService.success(res, {
      success: true,
      message: 'Password has been reset successfully.',
    }, 201);
  }

  function generatePassword(res, user, newUser) {
    return bcrypt.hash(user.password1, 10)
      .then(password => {
        if (user.password1 === user.password2) {
          unlockUser(newUser.id, password)
            .then(() => resetSuccess(res));
        } else {
          ResponseService.failure(res, 'Password1 and Password2 do not match.', 403);
        }
      });
  }

  function comparePasscode(res, user, newUser) {
    const lock = newUser.lock;

    return bcrypt.compare(user.passcode, lock.passcode)
      .then(result => {
        if (result) {
          return generatePassword(res, user, newUser);
        } else {
          ResponseService.failure(res, 'Invalid Passcode.', 403);
        }
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function resetpassword(req, res) {
    const user = {
      email: req.body.email,
      password1: req.body.password1,
      password2: req.body.password2,
      passcode: req.body.passcode
    };

    User.findOne({
      where: { email: user.email },
      include: [{
        model: Lock
      }]
    }).then(function(newUser) {
      if (newUser) {
        const status = newUser.status;
        if (status === 'locked') {
          return comparePasscode(res, user, newUser);
        } else if (status === 'active') {
          return generatePassword(res, user, newUser);
        } else if (status === 'suspended') {
          ResponseService.failure(res, {
            success: false,
            message: 'Account has been suspended by Admin.',
          }, 403);
        } else {
          ResponseService.failure(res, 'Could not reset password.');
        }
      } else {
        ResponseService.failure(res, 'Unknown username.');
      }
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function sendPasscode(res, user) {
    const passcode = randomstring.generate();
    let content = "Use the passcode to reset your password."
    content += "\n\n " + passcode;

    bcrypt.hash(passcode, 10)
      .then(newPasscode => {
        return Lock.update({
          passcode: newPasscode
        }, {
            where: {
              user_id: user.id
            }
          });
      })
      .then(() => {
        SendGridService.sendEmail({
          to: user.email,
          from: 'admin@rentaref.com',
          subject: 'Reset Password.',
          content: content
        });
      });
  }

  function forgotpassword(req, res) {
    const user = {
      email: req.body.email,
    };

    User.findOne({
      where: { email: user.email },
      include: [{
        model: Lock
      }]
    }).then(function(newUser) {
      if (newUser) {
        const status = newUser.status;

        if (status === 'active' || status === 'locked') {
          return sendPasscode(res, newUser);
        } else if (newUser.status === 'suspended') {
          ResponseService.failure(res, {
            success: false,
            message: 'Account has been suspended by Admin.',
          }, 403);
        } else {
          ResponseService.failure(res, 'Could not generate passcode.');
        }
      } else {
        ResponseService.failure(res, 'Unknown username.');
      }
    })
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    resetpassword,
    forgotpassword
  }
}
