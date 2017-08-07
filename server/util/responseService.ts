export default class ResponseService {
  models;

  constructor(models) {
    this.models = models;
  }
  
  makeObject(req) {
    let obj = Object.assign({}, req.body);
    delete obj.created_at;
    delete obj.deleted_at;
    delete obj.updated_at;
    return obj;
  }

  limitOffset(clauses, req, attributes = ['id']) {
    let query = req.query || {
      offset: 0,
      limit: 10
    };
    let limit = (parseInt(query.limit) || 10);
    let offset = (parseInt(query.offset) || 0) * 10;
    let order = query.order || 'ASC';

    order = attributes.map(function(attribute) {
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

  findOne(Model, obj_id, res, callback, status = 200) {
    Model.findOne({
      where: {
        id: obj_id
      }
    }).
      then(callback)
      .then(obj => this.success(res, obj, status))
      .catch(error => this.exception(res, error, 400));
  }

  findObject(obj_id, name, res, callback, status = 200) {
    const foundObject = (obj) => {
      if (!obj) {
        this.failure(res, name + ' Not Found.', 404);
      } else {
        return callback(obj);
      }
    }
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
    const message = {
      success: true,
      data: collection
    };

    this.success(res, message, status);
  }

  failure(res, message, status = 403) {
    res.status(status).json({
      success: false,
      message: message
    });
  }

  exception(res, error, status = 500) {
    console.log('errored:', error.message);
    this.failure(res, 'An Internal Error Occurred', status);
  }

  isAdmin(req) {
    const authorization = req.decoded.accessLevel;
    return (authorization === 1 || authorization === 2);
  }

  isUser(req) {
    return req.decoded.id === req.params.id;
  }

  isUserOrAdmin(req) {
    return this.isUser(req) || this.isAdmin(req);
  }

  permissionViolation(res) {
    this.failure(res, "Forbidden: Permissions violation.");
  }

  executeAsAdmin(req, res, callback) {
    if (this.isAdmin(req)) {
      callback();
    } else {
      this.permissionViolation(res);
    }
  }
}
