"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function OrganizationController(models, ResponseService) {
    var Organization = models.Organization;
    var Address = models.Address;
    var Organizer = models.Organizer;
    var Phone = models.Phone;
    var attributes = ['id', 'name', 'user_id'];
    function getAll(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        Organization.findAndCountAll(clause)
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getByUser(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        var Image = models.Image;
        var whereClause = Object.assign(clause, {
            where: {
                user_id: req.params.user_id
            },
            include: [
                {
                    model: Image,
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        Organization.findAndCountAll(whereClause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOrganizers(req, res) {
        var Organizer = models.Organizer;
        Organizer.findAll({
            where: {
                organization_id: req.params.organization_id
            },
            include: [
                {
                    model: models.Person
                }
            ]
        })
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        Organization.findOne({
            where: {
                id: req.params.organization_id
            },
            include: [
                {
                    model: models.Image
                },
                {
                    model: Address
                },
                {
                    model: Phone
                }
            ],
            attributes: attributes
        })
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, user_id, body, organization, addresses, phones, transaction, newOrganization, organizer, newOrganizer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        user_id = req.decoded.id;
                        body = ResponseService.getItemFromBody(req);
                        organization = {
                            name: body.name,
                            user_id: user_id
                        };
                        addresses = body.addresses;
                        phones = body.phones;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Organization.create(organization, {
                                transaction: transaction
                            })];
                    case 3:
                        newOrganization = _a.sent();
                        organizer = {
                            organization_id: newOrganization.id,
                            user_id: user_id
                        };
                        return [4 /*yield*/, Organizer.create(organizer, { transaction: transaction })];
                    case 4:
                        newOrganizer = _a.sent();
                        return [4 /*yield*/, bulkCreateAddresses(newOrganization, addresses, transaction)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bulkCreatePhones(newOrganization, phones, transaction)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 7:
                        _a.sent();
                        ResponseService.success(res, {
                            id: newOrganization.id,
                            name: newOrganization.name,
                            user_id: newOrganization.user_id
                        }, 201);
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function update(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, body, organization_id, newAddresses, newPhones, updatedAddresses, updatedPhones, newName, transaction, organization, addresses, phones, newOrganization, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        body = ResponseService.getItemFromBody(req);
                        organization_id = req.params.organization_id;
                        newAddresses = body.newAddresses;
                        newPhones = body.newPhones;
                        updatedAddresses = body.updatedAddresses;
                        updatedPhones = body.updatedPhones;
                        newName = body.name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 14, , 15]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Organization.findById(organization_id, {
                                transaction: transaction
                            })];
                    case 3:
                        organization = _a.sent();
                        if (!organization) {
                            throw new Error('Organization not found.');
                        }
                        if (!(_.isString(newName) && newName.length > 3)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Organization.update({ name: newName }, {
                                where: {
                                    id: organization_id
                                }
                            }, { transaction: transaction })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, bulkCreateAddresses(organization, newAddresses, transaction)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, bulkCreatePhones(organization, newPhones, transaction)];
                    case 7:
                        _a.sent();
                        if (!(Array.isArray(updatedAddresses) && updatedAddresses.length > 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, Promise.all(updatedAddresses.map(function (address) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Address.update(address, {
                                                where: {
                                                    id: address.id
                                                }
                                            }, { transaction: transaction })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 8:
                        addresses = _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!(Array.isArray(updatedPhones) && updatedPhones.length > 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, Promise.all(updatedPhones.map(function (phone) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Phone.update(phone, {
                                                where: {
                                                    id: phone.id
                                                }
                                            }, { transaction: transaction })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 10:
                        phones = _a.sent();
                        _a.label = 11;
                    case 11: return [4 /*yield*/, Organization.findOne({
                            where: {
                                id: organization_id
                            },
                            include: [
                                {
                                    model: models.Image
                                },
                                {
                                    model: Address
                                },
                                {
                                    model: Phone
                                }
                            ],
                            attributes: attributes
                        }, { transaction: transaction })];
                    case 12:
                        newOrganization = _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 13:
                        _a.sent();
                        ResponseService.success(res, newOrganization);
                        return [3 /*break*/, 15];
                    case 14:
                        error_2 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_2);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    }
    function bulkCreateAddresses(organization, addresses, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var newAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Array.isArray(addresses) && addresses.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Address.bulkCreate(addresses, {
                                transaction: transaction,
                                returning: true
                            })];
                    case 1:
                        newAddresses = _a.sent();
                        return [4 /*yield*/, organization.addAddress(newAddresses, { transaction: transaction })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function bulkCreatePhones(organization, phones, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var newPhones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Array.isArray(phones) && phones.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Phone.bulkCreate(phones, {
                                transaction: transaction,
                                returning: true
                            })];
                    case 1:
                        newPhones = _a.sent();
                        return [4 /*yield*/, organization.addPhone(newPhones, { transaction: transaction })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Game, organization_id, transaction, organization, games, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Game = models.Game;
                        organization_id = req.params.organization_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Organization.findOne({
                                where: {
                                    id: organization_id
                                },
                                include: [
                                    {
                                        model: Game
                                    }
                                ]
                            }, { transaction: transaction })];
                    case 3:
                        organization = _a.sent();
                        games = organization.games;
                        if (!organization) {
                            throw new Error('Organization not found.');
                        }
                        if (games.length > 0) {
                            throw new Error('This organization has ' + games.length + ' events.');
                        }
                        return [4 /*yield*/, Organization.destroy({
                                where: {
                                    id: organization.id
                                }
                            }, { transaction: transaction })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 5:
                        _a.sent();
                        ResponseService.success(res, 'Organization :' + organization_id + ' was deleted', 204);
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    /*
    {
      fieldname: 'photo',
      originalname: 'blob',
      encoding: '7bit',
      mimetype: 'image/png',
      size: 102722,
      bucket: 'rentaref',
      key: '1525549567462',
      acl: 'private',
      contentType: 'application/octet-stream',
      contentDisposition: null,
      storageClass: 'STANDARD',
      serverSideEncryption: null,
      metadata: { fieldName: 'photo' },
      location: 'https://rentaref.s3.us-west-1.amazonaws.com/1525549567462',
      etag: '"c1fdf2fd9f3a5dbc41bc9527415736a0"'
    }
  */
    function uploadLogo(req, res) {
        var file = req.file;
        if (file) {
            var sequelize = models.sequelize;
            var OrganizationImage_1 = models.OrganizationImage;
            var Image_1 = models.Image;
            var findOrganization_1 = function (newImage, t) {
                return Organization.findById(req.params.organization_id, {
                    transaction: t
                }).then(function (organization) {
                    return deleteOrganizationImage_1(newImage, organization, t);
                });
            };
            var deleteOrganizationImage_1 = function (newImage, organization, t) {
                return OrganizationImage_1.destroy({
                    where: {
                        organization_id: organization.id
                    }
                }, {
                    transaction: t
                }).then(function () {
                    return addOrganizationImage_1(newImage, organization, t);
                });
            };
            var addOrganizationImage_1 = function (newImage, organization, t) {
                return OrganizationImage_1.create({
                    image_id: newImage.id,
                    organization_id: organization.id
                }, {
                    transaction: t
                });
            };
            sequelize
                .transaction(function (t) {
                return Image_1.create(file, { transaction: t }).then(function (newImage) {
                    return findOrganization_1(newImage, t);
                });
            })
                .then(function () {
                ResponseService.success(res, 'Uploaded Image Successfully.');
            })
                .catch(function (error) { return ResponseService.exception(res, error); });
        }
        else {
            res.json(400, {
                success: false,
                message: 'upload failed.'
            });
        }
    }
    return {
        getAll: getAll,
        getByUser: getByUser,
        getOrganizers: getOrganizers,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        uploadLogo: uploadLogo
    };
}
exports.default = OrganizationController;
//# sourceMappingURL=organizationController.js.map