"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authorization(dbModels) {
    var models = dbModels;
    function checkIsAdmin(req) {
        var authorization = Number(req.decoded.authorization);
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
    function isUser(req, res, next) {
        if (checkIsUser(req)) {
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
    function isOrgOwner(req, res, next) {
        var Organization = models.Organization;
        var whereClause = {
            user_id: req.decoded.id,
            id: req.params.organization_id
        };
        checkAssociation(whereClause, Organization, req, res, next);
    }
    function isOrgMember(req, res, next) {
        var Organizer = models.Organizer;
        var whereClause = {
            user_id: req.decoded.id,
            organization_id: req.params.organization_id
        };
        checkAssociation(whereClause, Organizer, req, res, next);
    }
    function isUserAddress(req, res, next) {
        var whereClause = {
            user_id: req.decoded.id,
            address_id: req.params.address_id
        };
        var Model = models.UserAddress;
        checkAssociation(whereClause, Model, req, res, next);
    }
    function checkAssociation(whereClause, Model, req, res, next) {
        if (checkIsAdmin(req)) {
            next();
        }
        else {
            Model.findOne(whereClause)
                .then(function (item) {
                if (item) {
                    next();
                }
                else {
                    permissionViolation(res, next);
                }
            })
                .catch(function (error) { return serverError(res, next, error); });
        }
    }
    function serverError(res, next, error) {
        var checkError = new Error('There was a server error.');
        res.json(500, {
            success: false,
            message: 'Internal Server Error.'
        });
        next(checkError);
    }
    function permissionViolation(res, next) {
        var checkError = new Error('User does not have permission to perform this action.');
        res.json(403, {
            success: false,
            message: 'Forbidden: Permission Violation.'
        });
        next(checkError);
    }
    return {
        isAdmin: isAdmin,
        isUser: isUser,
        isUserOrAdmin: isUserOrAdmin,
        isUserAddress: isUserAddress,
        isOrgOwner: isOrgOwner,
        isOrgMember: isOrgMember
    };
}
exports.default = authorization;
//# sourceMappingURL=authorization.js.map