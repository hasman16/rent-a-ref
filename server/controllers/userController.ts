export default function UserController(
  models,
  ResponseService,
  SendGridService
) {
  const User = models.User;
  const attributes = [
    'id',
    'email',
    'authorization',
    'can_organize',
    'can_referee',
    'status'
  ];

  function getAll(req, res) {
    const clause = ResponseService.makeClause(req);

    User.findAndCountAll(clause)
      .then(results => {
        ResponseService.successCollection(res, results);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    User.findOne({
      where: {
        id: req.params.user_id
      },
      attributes: attributes
    })
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function makeUser(newUser) {
    return {
      email: newUser.email,
      authorization: newUser.authorization,
      can_organize: newUser.can_organize,
      can_referee: newUser.can_referee,
      status: newUser.status
    };
  }

  function returnUser(res, user, status = 200) {
    const newUser = makeUser(user);
    newUser['id'] = user.id;
    ResponseService.success(res, newUser, status);
  }

  function update(req, res) {
    const user = ResponseService.makeObject(req.body);
    if (!ResponseService.isAdmin(req)) {
      delete user.authorization;
    }
    User.update(user, {
      where: {
        id: req.params.user_id
      }
    })
      .then(updatedUser => returnUser(res, updatedUser, 200))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteOne(req, res) {
    const user = makeUser(req.body);

    User.destroy(user)
      .then(() => ResponseService.success(res, 'User deleted', 204))
      .catch(error => ResponseService.exception(res, error));
  }

  function logout(req, res) {
    const user = makeUser(req.body);
  }

  return {
    logout: logout,
    getAll: getAll,
    getOne: getOne,
    update: update,
    deleteOne: deleteOne
  };
}
