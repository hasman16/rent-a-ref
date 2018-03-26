import * as _ from 'lodash';

export default class ResponseService {
  models;
  baseTable;

  constructor(models) {
    this.models = models;
  }

  makeObject(req) {
    return this.getItemFromBody(req);
  }

  limitOffset(clauses, req, attributes = ['id']) {
    let query = Object.assign(
      {},
      {
        offset: 0,
        limit: 10
      },
      req.query
    );
    let limit = parseInt(query.limit, 10) || 10;
    let offset = (parseInt(query.offset, 10) || 0) * 10;
    let order = query.order || 'ASC';

    order = attributes.map(attribute => {
      return [attribute, order];
    });

    offset = Math.max(offset, 0);
    limit = Math.max(limit, 1);
    limit = Math.min(limit, 20);
    clauses.offest = offset;
    clauses.limit = limit;
    clauses.order = order;
    return clauses;
  }

  getItemFromBody(req) {
    let obj = Object.assign({}, req.body);
    return this.deleteItemDates(obj);
  }

  deleteItemDates(oldItem): any {
    let item = _.cloneDeep(oldItem);
    delete item.created_at;
    delete item.deleted_at;
    delete item.updated_at;
    return item;
  }

  deleteId(oldItem): any {
    let item = _.cloneDeep(oldItem);
    delete item.id;
    return item;
  }

  firstKeyFromReqBody(req): string {
    return _.head(_.keys(req.body));
  }

  getArrayFromBody(req): any[] {
    const key: string = this.firstKeyFromReqBody(req);
    return req.body[key];
  }

  findOne(Model, obj_id, res, callback, status = 200) {
    Model.findOne({
      where: {
        id: obj_id
      }
    })
      .then(callback)
      .then(obj => this.success(res, obj, status))
      .catch(error => this.exception(res, error, 400));
  }

  joinTableCreate(itemsJoin, tableJoin) {
    return (t, item) => {
      const model = itemsJoin(item);
      return tableJoin.create(model, { transaction: t });
    };
  }

  baseTableCreate(baseTable, joinTableCreate) {
    const createFunction = (t, item) => {
      return baseTable.create(item, { transaction: t }).then(newItem => {
        return joinTableCreate(t, newItem);
      });
    };

    return _.bind(this.create, this, createFunction);
  }

  baseTableBulkCreate(baseTable, joinTableCreate) {
    const sequelize = this.models.sequelize;
    const createFunction = (t, items) => {
      return baseTable
        .bulkCreate(items, { transaction: t, returning: true })
        .then(items => {
          return sequelize.Promise.each(items, item => {
            return joinTableCreate(t, item);
          });
        });
    };

    return _.bind(this.bulkCreate, this, createFunction);
  }

  bulkUpdateQuery(baseTable, joinTable, joinMethod) {
    const query = (t, item) => {
      return joinTable
        .findOne(
          {
            where: joinMethod(item)
          },
          { transaction: t, returning: true }
        )
        .then(newItem => {
          if (newItem) {
            return baseTable.update(
              item,
              {
                where: {
                  id: item.id
                }
              },
              { transaction: t, returning: true }
            );
          }
        });
    };

    return _.bind(this.bulkUpdate, this, query);
  }

  selectBaseTableQuery(type, baseTable, joinTableCreate) {
    let tableAction;
    switch (type) {
      case 'create':
        tableAction = this.baseTableCreate(baseTable, joinTableCreate);
        break;
      case 'bulkCreate':
        tableAction = this.baseTableBulkCreate(baseTable, joinTableCreate);
        break;
      default:
        tableAction = (req, res) => this.exception(res, 'Unknown method');
        break;
    }

    return tableAction;
  }

  executeCreate(res, createFunction, args) {
    const sequelize = this.models.sequelize;
    sequelize
      .transaction(t => {
        return createFunction(t, args).then(result => {
          this.success(res, result, 201);
        });
      })
      .catch(error => this.exception(res, error));
  }

  create(baseTableCreate, req, res) {
    console.log('this is:');
    const item = this.deleteId(this.getItemFromBody(req));
    this.executeCreate(res, baseTableCreate, item);
  }

  getBulkItemsArrayFromBody(req, filterFunction) {
    return _(this.getArrayFromBody(req))
      .filter(filterFunction)
      .map(item => this.deleteItemDates(item))
      .value();
  }

  bulkCreate(baseTableBulkCreate, req, res) {
    const filterFunction = item => _.isNil(item.id);
    const newItems: any[] = this.getBulkItemsArrayFromBody(req, filterFunction);
    this.executeCreate(res, baseTableBulkCreate, newItems);
  }

  bulkUpdate(bulkUpdateQuery, req, res) {
    const sequelize = this.models.sequelize;
    const filterFunction = item => !_.isNil(item.id);
    const items = this.getBulkItemsArrayFromBody(req, filterFunction);

    sequelize
      .transaction(t => {
        return sequelize.Promise.each(items, item => {
          return bulkUpdateQuery(t, item);
        }).then((items: any[]) => {
          this.success(res, items, 200);
        });
      })
      .catch(error => this.exception(res, error));
  }

  findObject(obj_id, name, res, callback, status = 200) {
    const foundObject = obj => {
      if (!obj) {
        this.failure(res, name + ' Not Found.', 404);
      } else {
        return callback(obj);
      }
    };
    const Model = this.models[name];

    this.findOne(Model, obj_id, res, foundObject, status);
  }

  success(res, message, status = 200) {
    if (typeof message === 'string') {
      message = {
        success: true,
        message: message
      };
    }
    res.status(status).json(message);
  }

  successCollection(res, collection, status = 200) {
    if (!collection || (Array.isArray(collection) && collection.length === 0)) {
      status = 204;
    }

    this.success(res, collection, status);
  }

  failure(res, message, status = 403) {
    res.status(status).json({
      success: false,
      message: message
    });
  }

  exception(res, error, status = 500) {
    console.log('errored:', error);
    this.failure(res, 'An Internal Error Occurred', status);
  }

  isAdmin(req) {
    const authorization = Number(req.decoded.authorization);
    return authorization === 1 || authorization === 2;
  }

  isUser(req) {
    return req.decoded.id === req.params.id;
  }

  isUserOrAdmin(req) {
    return this.isUser(req) || this.isAdmin(req);
  }

  permissionViolation(res) {
    this.failure(res, 'Forbidden: Permissions violation.');
  }

  executeAsAdmin(req, res, callback) {
    if (this.isAdmin(req)) {
      callback();
    } else {
      this.permissionViolation(res);
    }
  }
}
