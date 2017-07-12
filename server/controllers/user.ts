import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import BaseCtrl from './base';
import * as bcrypt from 'bcryptjs';


function hash (value: string) {
  return bcrypt.hash(value, 10);
};

export default class UserCtrl extends BaseCtrl {
  model = null;

  constructor(User: any) {
    super();
    this.model = User;
  }

  login = (req, res) => {
    var user = {
      email: req.body.email,
      password: req.body.password
    };
    function testing() {
      console.log('testing');
    }
    function authorizationFailed() {
      res.status(403).json({
        success: false,
        message: 'Authorization failed'
      });
    }

    this.model.findOne({
      where: { email: user.email }
    }).then(function(newUser) {
      var token = null;
      if (newUser) {
        return bcrypt.compare(user.password, newUser.password)
          .then(result => {
            console.log('result is:', result);
            if (result) {
              token = jwt.sign(user, process.env.SECRET_TOKEN, {
                expiresIn: 1440 * 60
              });

              res.status(200).json({
                success: true,
                message: 'Authorization success',
                token: token,
                accessLevel: newUser.authorization
              });
            } else {
              authorizationFailed();
            }
          });
      } else {
        authorizationFailed();
      }
    })
      .catch(function(error) {
        console.log('error:', error);
        res.status(500).json({
          success: false,
          message: 'Error occurred'
        });
      });
  }

  logout = (req, res) => {
    var user = new Object(req.body);
  }
}
