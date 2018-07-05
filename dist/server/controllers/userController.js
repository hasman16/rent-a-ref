"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var clause = ResponseService.produceSearchAndSortClause(req);
        User.findAndCountAll(clause)
            .then(function (results) {
            ResponseService.successCollection(res, results);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
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
        //console.log('uploadLogon:', file);
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
    function findUser(user_id, t) {
        return User.findById(user_id, {
            transaction: t
        });
    }
    function findMatch(user_id, t) {
        var Match = models.Match;
        return Match.findById(user_id, {
            transaction: t
        });
    }
    function findOfficiate(user_id, game_id, t) {
        var Officiate = models.Officiates;
        return Officiate.findOne({
            where: {
                user_id: user_id,
                game_id: game_id
            }
        }, {
            transaction: t
        });
    }
    function createOfficiate(user_id, game_id, t) {
        var Officiate = models.Officiates;
        return Officiate.create({
            user_id: user_id,
            game_id: game_id
        }, {
            transaction: t
        });
    }
    function unassignOfficial(officiate_id, t) {
        var Officiate = models.Officiates;
        return Officiate.destroy({
            where: {
                id: officiate_id
            }
        }, {
            transaction: t
        });
    }
    function addOfficialToMatch(req, res) {
        var sequelize = models.sequelize;
        var body = ResponseService.getItemFromBody(req);
        var match_id = body.match_id;
        var user_id = body.user_id;
        sequelize
            .transaction(function (t) {
            return findMatch(match_id, t)
                .then(function (match) {
                if (match) {
                    return findUser(user_id, t);
                }
                else {
                    ResponseService.exception(res, 'Match not found.');
                }
            })
                .then(function (user) {
                if (user) {
                    if (user.can_referee == 'active') {
                        return findOfficiate(user_id, match_id, t).then(function (officiate) {
                            if (officiate) {
                                ResponseService.exception(res, 'User already officiating this match.');
                            }
                            else {
                                return createOfficiate(user_id, match_id, t);
                            }
                        });
                    }
                    else {
                        ResponseService.exception(res, 'User is not a referee.');
                    }
                }
                else {
                    ResponseService.exception(res, 'User not found.');
                }
            })
                .then(function (officiate) {
                ResponseService.success(res, officiate);
            });
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function removeOfficialFromMatch(req, res) {
        var sequelize = models.sequelize;
        var body = ResponseService.getItemFromBody(req);
        var match_id = body.match_id;
        var user_id = body.user_id;
        sequelize
            .transaction(function (t) {
            return findOfficiate(user_id, match_id, t).then(function (officiate) {
                if (officiate) {
                    return unassignOfficial(officiate.id, t);
                }
                else {
                    ResponseService.exception(res, 'User not assigned to this match.');
                }
            });
        })
            .then(function (officiate) {
            ResponseService.success(res, 'User has been unassigned from match.');
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        logout: logout,
        getAll: getAll,
        getOne: getOne,
        update: update,
        deleteOne: deleteOne,
        addOfficialToMatch: addOfficialToMatch,
        removeOfficialFromMatch: removeOfficialFromMatch,
        uploadImage: uploadImage
    };
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map