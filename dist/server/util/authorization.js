"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authorization() {
    function checkIsAdmin(req) {
        var authorization = Number(req.decoded.accessLevel);
        return (authorization === 1 || authorization === 2);
    }
    function checkIsUser(req) {
        return Number(req.decoded.id) === Number(req.params.user_id);
    }
    function isAdmin(req, res, next) {
        if (checkIsAdmin(req)) {
            next();
        }
        else {
            permissionViolation(res, next);
        }
    }
    function isUserOrAdmin(req, res, next) {
        if (checkIsUser(req) || checkIsAdmin(req)) {
            next();
        }
        else {
            permissionViolation(res, next);
        }
    }
    function permissionViolation(res, next) {
        var checkError = new Error('User does not have permission to perform this action.');
        res.json(403, {
            success: false,
            message: 'Permission Violation'
        });
        next(checkError);
    }
    return {
        isAdmin: isAdmin,
        isUserOrAdmin: isUserOrAdmin
    };
}
exports.default = authorization;
//# sourceMappingURL=authorization.js.map