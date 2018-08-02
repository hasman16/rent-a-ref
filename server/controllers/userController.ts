import * as _ from 'lodash';

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
    const sequelize = models.sequelize;
    const Person = models.Person;
    const Image = models.Image;
    const clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(clause, {
      include: [
        {
          model: Person
        },
        {
          model: Image,
          through: {
            attributes: []
          }
        }
      ]
    });

    User.findAndCountAll(clause)
      .then(results => {
        ResponseService.successCollection(res, results);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function getSortColumn(value: string) {
    let sortColumn: string = '';
    switch (value) {
      case 'firstname':
      case 'lastname':
      case 'gender':
      case 'dob':
      case 'user_id':
        sortColumn = 'people.';
        break;
      default:
        sortColumn = 'users.';
        break;
    }
    return sortColumn + value;
  }

  function produceLikeClause(req) {
    let attributepairs = String(req.query.search).split(',');

    let keyvalues = attributepairs
      .map(keyvalue => {
        return keyvalue.split('|');
      })
      .filter(entries => _.isArray(entries) && entries.length === 2)
      .map(entries => {
        let value = (entries[1] || '') + '%';
        let key = entries[0] || 'badkey';
        key = getSortColumn(key);

        return ` AND ${key} ilike '${value}' `;
      });

    return keyvalues.join(' ');
  }

  async function getAllFlat(req, res) {
    const sequelize = models.sequelize;
    const sortClause = ResponseService.produceLimitOffsetAndSort(req);
    const order: Array<any> = _.head(sortClause.order);
    const sortColumn: string = getSortColumn(order[0]);
    const limit = ` OFFSET ${sortClause.offset} LIMIT ${sortClause.limit} `;
    const sort = ` ORDER BY ${sortColumn} ${order[1]}`;
    const columns = 'SELECT * ';
    const like = produceLikeClause(req);
    let query = `FROM users,people WHERE users.id = people.user_id `;
    let countQuery = 'SELECT COUNT(*) ' + query + like + sort + ';';
    query = columns + query + like + sort + limit + ';';

    console.log('query is:', query, countQuery);
    try {
      const count: Array<any> = await sequelize.query(countQuery, {
        type: sequelize.QueryTypes.SELECT
      });
      const rows: Array<any> = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });
      console.log('count was:', count);
      let results = {
        count: rows.length,
        rows: rows
      };
      ResponseService.successCollection(res, results);
    } catch (error) {
      ResponseService.exception(res, error, 403);
    }
  }

  function getOne(req, res) {
    const Image = models.Image;
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

  return {
    logout,
    getAll,
    getAllFlat,
    getOne,
    update,
    deleteOne,
    uploadImage
  };
}
