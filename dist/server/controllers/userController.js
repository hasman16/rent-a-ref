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
    function getAllFlat(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, sortClause, order, sortColumn, limit, sort, columns, query, rows, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        sortClause = ResponseService.produceLimitOffsetAndSort(req);
                        order = _.head(sortClause.order);
                        sortColumn = getSortColumn(order[0]);
                        limit = " OFFSET " + sortClause.offset + " LIMIT " + sortClause.limit + " ";
                        sort = " ORDER BY " + sortColumn + " " + order[1];
                        columns = 'SELECT * ';
                        query = "FROM users,people WHERE users.id = people.user_id AND users.email like '%ad%' ";
                        query = columns + query + sort + limit + ';';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sequelize.query(query, {
                                type: sequelize.QueryTypes.SELECT
                            })];
                    case 2:
                        rows = _a.sent();
                        results = {
                            count: rows.length,
                            rows: rows
                        };
                        ResponseService.successCollection(res, results);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        ResponseService.exception(res, error_1, 403);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
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