/*import * as _ from 'lodash';

export default abstract class BaseController {
	baseTable: any;
	attributes:string[];
  models: any;
  responseService: any;

	  // Get all
  getAll = (req, res) => {
   this.baseTable.findAll({
      attributes: this.attributes
    })
      .then((collection: any[]) => this.responseService.success(res, collection))
      .catch(error => this.responseService.exception(res, error));
  }

  getOne = (req, res, id:any) => {
    this.baseTable.findOne({
      where: {
        id: id
      },
      attributes: this.attributes
    })
      .then((result) => this.responseService.success(res, result))
      .catch(error => this.responseService.exception(res, error));
  }

  create = (req, res, joinTable, joinMethod) => {
    const sequelize = this.models.sequelize;
    let anObject = this.deleteId(this.getItemFromBody(req));
    delete anObject.id;

    sequelize.transaction((t) => {
      return this.baseTable.create(anObject, { transaction: t })
        .then((newObject) => {
          const model = joinMethod(newObject);
          return joinTable.create(model, { transaction: t })
            .then(newModel => {
              this.responseService.success(res, newModel, 201);
            });
        });
    })
      .catch(error => this.responseService.exception(res, error));
  }

  getItemFromBody = (req) => {
    let obj = Object.assign({}, req.body);
    return this.deleteItemDates(obj);
  }

  deleteItemDates = (oldItem): any => {
    let item = _.cloneDeep(oldItem);
    delete item.created_at;
    delete item.deleted_at;
    delete item.updated_at;
    return item;
  }

  deleteId = (oldItem): any => {
    let item = _.cloneDeep(oldItem);
    delete item.id;
    return item;
  }

  firstKeyFromReqBody = (req): string =>{
    return _.head(_.keys(req.body));
  }

  getArrayFromBody = (req): any[] => {
     const key: string = this.firstKeyFromReqBody(req);
     return req.body[key];
  }

  bulkCreate = (req, res, joinTable, joinMethod) => {
    const sequelize = this.models.sequelize;
    let newItems: any[] = _.map(this.getArrayFromBody(req), (item) => {
      return this.deleteItemDates(this.deleteId(item));
    });

    sequelize.transaction((t) => {
      return this.baseTable.bulkCreate(newItems, { transaction: t, returning: true })
        .then((items) => {
          return sequelize.Promise.each(items, (item) => {
            const model = joinMethod(item);
            return joinTable.create(model, { transaction: t });
          });
        })
        .then((items: any[]) => {
          this.responseService.success(res, items, 201);
        });
    })
      .catch(error => this.responseService.exception(res, error));
  }

  bulkUpdate = (req, res) => {
    const sequelize = this.models.sequelize;
    const items = _(this.getArrayFromBody(req))
                            .filter(item => !_.isNil(item.id))
                            .map(item => {
                               return this.deleteItemDates(item);
                            })
                            .value();

    sequelize.transaction((t) => {
      return sequelize.Promise.each(items, item => {
          return this.baseTable.update(item, {
                where: {
                  id: item.id
                }
              },
              { transaction: t, returning: true });
         })
        .then(newItems => {
          this.responseService.success(res, newItems, 201);
        });
    })
      .catch(error => this.responseService.exception(res, error));
  }
}*/