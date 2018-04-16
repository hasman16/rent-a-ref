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
    function getParams(req) {
        var clauses = {
            attributes: attributes,
            where: {}
        };
        var query = req.query;
        var order = [];
        if (query.can_referee) {
            order.push['can_referee'];
            clauses.where['can_referee'] = query.can_referee;
        }
        if (order.length === 0) {
            order = undefined;
        }
        return ResponseService.limitOffset(clauses, req, order);
    }
    function getAll(req, res) {
        var params = getParams(req);
        User.findAll(params)
            .then(function (results) { return ResponseService.successCollection(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        User.findOne({
            where: {
                id: req.params.user_id
            },
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
    return {
        logout: logout,
        getAll: getAll,
        getOne: getOne,
        update: update,
        deleteOne: deleteOne
    };
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map