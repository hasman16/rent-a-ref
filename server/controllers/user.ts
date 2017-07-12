import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import BaseCtrl from './base';
import * as bcrypt from 'bcryptjs';
import ResponseService from './../util/responseService';

export default class UserCtrl extends BaseCtrl {
  model = null;

  constructor(User: any) {
    super();
    this.model = User;
  }

  // Get all
  getAll = (req, res) => {
    console.log('get all users');
    this.model.findAll({
      attributes: ['id', 'email', 'authorization']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  get = (req, res) => {
    console.log('get user');
    this.model.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'email', 'authorization']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  create = (req, res) => {
    var user = new Object(req.body);
    this.model.create(user)
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

  update = (req, res) => {
    var user = new Object(req.body);
    this.model.update(user, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, "User updated"))
      .catch(error => ResponseService.exception(res, error));
  }

  delete = (req, res) => {
    var user = new Object(req.body);
    this.model.destroy(user)
      .then(result => ResponseService.success(res, "User deleted"))
      .catch(error => ResponseService.exception(res, error));
  }

  login = (req, res) => {
    var user = {
      email: req.body.email,
      password: req.body.password
    };

    this.model.findOne({
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

  logout = (req, res) => {
    var user = new Object(req.body);
  }
}
