import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import BaseCtrl from './base';

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

    function authorizationFailed() {
      res.status(403).json({
        success: false,
        message: 'Authorization failed'
      });
    }

    this.model.findOne({
      where: { email: user.email, password: user.password }
    }).then(function(newUser) {
      var token = null;
      if (newUser) {
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
    }).catch(function(err) {
      res.status(500).json({
        success: false,
        message: 'Error occurred:' + err
      });
    });
  }

  logout = (req, res) => {
    var user = new Object(req.body);
  }
  /*
    login = (req, res) => {
      this.model.findOne({ email: req.body.email }, (err, user) => {
        if (!user) { return res.sendStatus(403); }
        user.comparePassword(req.body.password, (error, isMatch) => {
          if (!isMatch) { return res.sendStatus(403); }
          const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
          res.status(200).json({ token: token });
        });
      });
    };
  */
}
