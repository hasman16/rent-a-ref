import * as randomstring from 'randomstring';

export default function passwordController(bcrypt, jwt, models, ResponseService, SendGridService) {
  const User = models.User;
  const Lock = models.Lock;

  function unlockUser(user_id, password) {
    const sequelize = models.sequelize;

    return sequelize.transaction(function(t) {
      return User.update({
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
        .then(function(user) {
          return Lock.update({
            attempts: 0,
            passcode: null,
            passcode_age: null,
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
    return bcrypt.hash(user.password1, 12)
      .then(password => {
        if (user.password1 === user.password2) {
          return unlockUser(newUser.id, password)
            .then(() => resetSuccess(res));
        } else {
          ResponseService.failure(res, 'Password1 and Password2 do not match.', 403);
        }
      });
  }

  function changepassword(req, res) {
    const user = {
      id: req.params.user_id,
      password1: req.body.password1,
      password2: req.body.password2,
    };

    User.findOne({
      where: { id: user.id },
      include: [{
        model: Lock
      }]
    }).then(function(newUser) {
      let message = 'Unknown user.';
      if (newUser) {
        switch(newUser.status){
        case 'active':
          return generatePassword(res, user, newUser);
        case 'locked':
          message = 'Account is locked check your mail.';
        case 'suspended':
          message = 'Account has been suspended by Admin.';
          break;
        default:
          message = 'Could not change password.';
        }
      }
      ResponseService.failure(res, message);

    })
      .catch(error => ResponseService.exception(res, error));
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
      let message = 'Unknown username.';
      if (newUser) {
        const status = newUser.status;
        if (status === 'locked' || status === 'active') {
          return comparePasscode(res, user, newUser);
        } else if (status === 'suspended') {
          message = 'Account has been suspended by Admin.';
        } else {
          message = 'Could not reset password.';
        }
      }
        ResponseService.failure(res, message);
    })
      .catch(error => ResponseService.exception(res, error));
  }

  function sendPasscode(res, user) {
    const passcode = randomstring.generate();
    let content = 'Use the passcode to reset your password.'
    content += '\n\n ' + passcode
    content += '\n\n '
    content += '\n\n '
    content += '\n\n Or you can copy the link below to launch the reset password page'
    content += '\n\n '
    content += '\n\n '
    content += '\n\n http://localhost:4200/reset?passcode=' + passcode;

    bcrypt.hash(passcode, 12)
      .then(newPasscode => {
        return Lock.update({
          passcode: newPasscode,
          passcode_age: (new Date())
        }, {
            where: {
              user_id: user.id
            }
          });
      })
      .then(() => {
        return SendGridService.sendEmail({
          to: user.email,
          from: 'admin@rentaref.com',
          subject: 'Reset Password.',
          content: content
        });
      })
      .then(() => {
        ResponseService.success(res, {
          success: true,
          message: 'A new passcode sent to ' + user.email + '.'
        }, 201);
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
      let message = 'Unknown username.';
      if (newUser) {
        const status = newUser.status;

        if (status === 'active' || status === 'locked') {
          return sendPasscode(res, newUser);
        } else if (newUser.status === 'suspended') {
          message = 'Account has been suspended by Admin.';
        } else {
          message = 'Could not generate passcode.';
        }
      }
        ResponseService.failure(res, message);
    })
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    changepassword,
    forgotpassword,
    resetpassword
  }
}
