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
      include: [
        {
          model: Image,
          through: {
            attributes: []
          }
        }
      ],
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

  function findUser(user_id, t) {
    return User.findById(user_id, {
      transaction: t
    });
  }

  function findMatch(user_id, t) {
    const Match = models.Match;
    return Match.findById(user_id, {
      transaction: t
    });
  }

  function findOfficiate(user_id, match_id, t) {
    const Officiating = models.Officiating;
    return Officiating.findOne(
      {
        where: {
          user_id,
          match_id
        }
      },
      {
        transaction: t
      }
    );
  }

  function matchScheduleByUser(req, res) {
    const Officiating = models.Officiating;
    const Match = models.Match;
    let clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(clause, {
      where: {
        user_id: req.params.user_id
      },
      include: [
        {
          model: Match,
          through: {
            attributes: []
          }
        }
      ]
    });

    console.log('findScheduleByUser:::', whereClause);
    Officiating.findAndCountAll(whereClause)
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function createOfficiate(user_id, match_id, t) {
    const Officiating = models.Officiating;

    return Officiating.create(
      {
        user_id,
        match_id
      },
      {
        transaction: t
      }
    );
  }

  function unassignOfficial(officiate_id, t) {
    const Officiating = models.Officiating;

    return Officiating.destroy(
      {
        where: {
          id: officiate_id
        }
      },
      {
        transaction: t
      }
    );
  }

  function addOfficialToMatch(req, res) {
    const sequelize = models.sequelize;
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;

    sequelize
      .transaction(function(t) {
        return findMatch(match_id, t)
          .then(match => {
            if (match) {
              return findUser(user_id, t);
            } else {
              ResponseService.exception(res, 'Match not found.');
            }
          })
          .then(user => {
            console.log('got user');
            if (user) {
              if (user.can_referee == 'active') {
                return findOfficiate(user_id, match_id, t).then(officiate => {
                  if (officiate) {
                    ResponseService.exception(
                      res,
                      'User already officiating this match.'
                    );
                  } else {
                    return createOfficiate(user_id, match_id, t);
                  }
                });
              } else {
                ResponseService.exception(res, 'User is not a referee.');
              }
            } else {
              ResponseService.exception(res, 'User not found.');
            }
          })
          .then(officiate => {
            ResponseService.success(res, officiate);
          });
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function removeOfficialFromMatch(req, res) {
    const sequelize = models.sequelize;
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;

    sequelize
      .transaction(function(t) {
        return findOfficiate(user_id, match_id, t).then(officiate => {
          if (officiate) {
            return unassignOfficial(officiate.id, t);
          } else {
            ResponseService.exception(res, 'User not assigned to this match.');
          }
        });
      })
      .then(officiate => {
        ResponseService.success(res, 'User has been unassigned from match.');
      })
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    logout,
    getAll,
    getOne,
    update,
    deleteOne,
    matchScheduleByUser,
    addOfficialToMatch,
    removeOfficialFromMatch,
    uploadImage
  };
}
