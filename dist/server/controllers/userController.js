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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
function UserController(models, ResponseService, SendGridService) {
    var User = models.User;
    var attributes = [
        'id',
        'email',
        'authorization',
        'can_organize',
        'can_referee',
        'status'
    ];
    function getAll(req, res) {
        var sequelize = models.sequelize;
        var Person = models.Person;
        var Image = models.Image;
        var clause = ResponseService.produceSearchAndSortClause(req);
        var whereClause = Object.assign(clause, {
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
            .then(function (results) {
            ResponseService.successCollection(res, results);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getSortColumn(value) {
        var sortColumn = '';
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
        var attributepairs = String(req.query.search).split(',');
        var keyvalues = attributepairs
            .map(function (keyvalue) {
            return keyvalue.split('|');
        })
            .filter(function (entries) { return _.isArray(entries) && entries.length === 2; })
            .map(function (entries) {
            var value = (entries[1] || '') + '%';
            var key = entries[0] || 'badkey';
            key = getSortColumn(key);
            return " AND " + key + " ilike '" + value + "' ";
        });
        return keyvalues.join(' ');
    }
    function getAllFlat(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Op, Image, sortClause, order, sortColumn, limit, sort, columns, like, query, countQuery, result, count, rows, ids, users_1, results, error_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Op = sequelize.Op;
                        Image = models.Image;
                        sortClause = ResponseService.produceLimitOffsetAndSort(req);
                        order = _.head(sortClause.order);
                        sortColumn = getSortColumn(order[0]);
                        limit = " OFFSET " + sortClause.offset + " LIMIT " + sortClause.limit + " ";
                        sort = " ORDER BY " + sortColumn + " " + order[1];
                        columns = 'SELECT users.id AS id, users.email AS email, users.can_organize AS can_organize, users.can_referee AS can_referee,' +
                            ' users.status AS status, users.authorization AS authorization, people.id AS person_id, people.gender AS gender, ' +
                            ' people.firstname AS firstname, people.lastname AS lastname, people.user_id AS user_id, people.dob AS dob ';
                        like = produceLikeClause(req);
                        query = "FROM users,people WHERE users.id = people.user_id ";
                        countQuery = 'SELECT COUNT(*) AS total ' + query + like + ' ;';
                        query = columns + query + like + sort + limit + ';';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, sequelize.query(countQuery, {
                                type: sequelize.QueryTypes.SELECT
                            })];
                    case 2:
                        result = _b.sent();
                        count = Number(_.head(result).total);
                        return [4 /*yield*/, sequelize.query(query, {
                                type: sequelize.QueryTypes.SELECT
                            })];
                    case 3:
                        rows = _b.sent();
                        ids = rows.map(function (row) { return row.user_id; });
                        return [4 /*yield*/, User.findAll({
                                where: {
                                    id: (_a = {},
                                        _a[Op.in] = rows.map(function (item) { return item.user_id; }),
                                        _a)
                                },
                                include: [
                                    {
                                        model: Image
                                    }
                                ]
                            })];
                    case 4:
                        users_1 = _b.sent();
                        results = {
                            count: count || 0,
                            rows: rows.map(function (row) {
                                var user = _.find(users_1, function (user) { return user.id == row.id; });
                                row['images'] = [];
                                if (user) {
                                    row['images'] = user.images;
                                }
                                return row;
                            })
                        };
                        ResponseService.successCollection(res, results);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        ResponseService.exception(res, error_1, 403);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function getOne(req, res) {
        var Image = models.Image;
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
            .then(function (result) { return ResponseService.success(res, result); })
            .catch(function (error) { return ResponseService.exception(res, error); });
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
    function returnUser(res, user, status) {
        if (status === void 0) { status = 200; }
        var newUser = makeUser(user);
        newUser['id'] = user.id;
        ResponseService.success(res, newUser, status);
    }
    function update(req, res) {
        var user = ResponseService.makeObject(req.body);
        if (!ResponseService.isAdmin(req)) {
            delete user.authorization;
        }
        User.update(user, {
            where: {
                id: req.params.user_id
            }
        })
            .then(function (updatedUser) { return returnUser(res, updatedUser, 200); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var user = makeUser(req.body);
        User.destroy(user)
            .then(function () { return ResponseService.success(res, 'User deleted', 204); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function logout(req, res) {
        var user = makeUser(req.body);
    }
    function uploadImage(req, res) {
        var file = req.file;
        if (file) {
            var sequelize = models.sequelize;
            var UserImage_1 = models.UserImage;
            var Image_1 = models.Image;
            var findUser_1 = function (newImage, t) {
                return User.findById(req.params.user_id, {
                    transaction: t
                }).then(function (user) {
                    return deleteUserImage_1(newImage, user, t);
                });
            };
            var deleteUserImage_1 = function (newImage, user, t) {
                return UserImage_1.destroy({
                    where: {
                        user_id: user.id
                    }
                }, {
                    transaction: t
                }).then(function () {
                    return addUserImage_1(newImage, user, t);
                });
            };
            var addUserImage_1 = function (newImage, user, t) {
                return UserImage_1.create({
                    image_id: newImage.id,
                    user_id: user.id
                }, {
                    transaction: t
                });
            };
            sequelize
                .transaction(function (t) {
                return Image_1.create(file, { transaction: t }).then(function (newImage) {
                    return findUser_1(newImage, t);
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
        logout: logout,
        getAll: getAll,
        getAllFlat: getAllFlat,
        getOne: getOne,
        update: update,
        deleteOne: deleteOne,
        uploadImage: uploadImage
    };
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map