import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import ResponseService from './../util/responseService';

export default function UserController(models) {
  var User = models.User;

  // Get all
  var getAll = (req, res) => {
    console.log('get all users');
    User.findAll({
      attributes: ['id', 'email', 'authorization']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  var getOne = (req, res) => {
    console.log('get user');
    User.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'email', 'authorization']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  var create = (req, res) => {
    var user = new Object(req.body);
    User.create(user)
      .then(newUser => {
        var user = {
          id: newUser.id,
          email: newUser.email,
          authorization: newUser.authorization
        }
        ResponseService.success(res, user);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  var update = (req, res) => {
    var user = new Object(req.body);
    User.update(user, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, "User updated"))
      .catch(error => ResponseService.exception(res, error));
  }

  var deleteOne = (req, res) => {
    var user = new Object(req.body);
    User.destroy(user)
      .then(result => ResponseService.success(res, "User deleted"))
      .catch(error => ResponseService.exception(res, error));
  }

  var login = (req, res) => {
    var user = {
      email: req.body.email,
      password: req.body.password
    };
    console.log('secret:', process.env.SECRET_TOKEN);
    User.findOne({
      where: { email: user.email }
    }).then(function(newUser) {
      var token = null;
      if (newUser) {
        return bcrypt.compare(user.password, newUser.password)
          .then(result => {

            if (result) {
              token = jwt.sign(user, process.env.SECRET_TOKEN, {
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

  var logout = (req, res) => {
    var user = new Object(req.body);
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
