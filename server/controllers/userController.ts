import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export default function UserController(models, ResponseService) {
  const User = models.User;

  // Get all
  function getAll(req, res) {
    User.findAll({
      attributes: ['id', 'email', 'authorization']
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'email', 'authorization']
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function returnUser(res, newUser) {
    const user = {
      id: newUser.id,
      email: newUser.email,
      authorization: newUser.authorization
    };

    ResponseService.success(res, user);
  }

  function create(req, res) {
    const aUser = {
      email: req.body.email,
      password: req.body.password,
      authorization: req.body.authorization || 5
    };

    User.findOne({
      where: { email: aUser.email },
      attributes: ['id', 'email', 'authorization']
    })
      .then(newUser => {
        if (newUser) {
          ResponseService.success(res, newUser);
        } else {
          return bcrypt.hash(aUser.password, 10)
        }
      })
      .then(password => {
        const user = {
          email: aUser.email,
          password: password,
          authorization: aUser.authorization
        };
        return User.create(user);
      })
      .then(newUser => returnUser(res, newUser))
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const user = new Object(req.body);
    User.update(user, {
      where: {
        id: req.params.id
      }
    })
      .then(result => ResponseService.success(res, 'User updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const user = new Object(req.body);
    User.destroy(user)
      .then(result => ResponseService.success(res, 'User deleted'))
      .catch(error => ResponseService.exception(res, error));
  }

  function login(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    User.findOne({
      where: { email: user.email }
    }).then(function(newUser) {
      if (newUser) {
        return bcrypt.compare(user.password, newUser.password)
          .then(result => {
            if (result) {
              const user = {
                id: newUser.id,
                email: newUser.email,
                authorization: newUser.authorization
              };

              const token = jwt.sign(user, process.env.SECRET_TOKEN, {
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

  function logout(req, res) {
    const user = new Object(req.body);
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
