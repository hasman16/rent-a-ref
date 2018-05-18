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
    const clause = ResponseService.produceSearchAndSortClause(req);

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

  function uploadImage(req, res) {
    const file = req.file;
    //console.log('uploadLogon:', file);
    if (file) {
      const sequelize = models.sequelize;
      const UserImage = models.UserImage;
      const Image = models.Image;
      const findUser = (newImage, t) => {
        return User.findById(req.params.user_id, {
          transaction: t
        }).then(user => {
          return deleteUserImage(newImage, user, t);
        });
      };
      const deleteUserImage = (newImage, user, t) => {
        return UserImage.destroy(
          {
            where: {
              user_id: user.id
            }
          },
          {
            transaction: t
          }
        ).then(() => {
          return addUserImage(newImage, user, t);
        });
      };
      const addUserImage = (newImage, user, t) => {
        return UserImage.create(
          {
            image_id: newImage.id,
            user_id: user.id
          },
          {
            transaction: t
          }
        );
      };

      sequelize
        .transaction(function(t) {
          return Image.create(file, { transaction: t }).then(newImage => {
            return findUser(newImage, t);
          });
        })
        .then(() => {
          ResponseService.success(res, 'Uploaded Image Successfully.');
        })
        .catch(error => ResponseService.exception(res, error));
    } else {
      res.json(400, {
        success: false,
        message: 'upload failed.'
      });
    }
  }

  return {
    logout,
    getAll,
    getOne,
    update,
    deleteOne,
    uploadImage
  };
}
