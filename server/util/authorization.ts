export default function authorization(dbModels) {
  const models = dbModels

  function checkIsAdmin(req) {
    const authorization = Number(req.decoded.accessLevel);
    return (authorization === 1 || authorization === 2);
  }

  function checkIsUser(req) {
    return Number(req.decoded.id) === Number(req.params.user_id);
  }

  function isAdmin(req, res, next) {
    if (checkIsAdmin(req)) {
      next();
    } else {
      permissionViolation(res, next);
    }
  }

  function isUser(req, res, next) {
    console.log('check isUser');
    if (checkIsUser(req)) {
      console.log('passed');
      next();
    } else {
      permissionViolation(res, next);
    }
  }

  function isUserOrAdmin(req, res, next) {
    if (checkIsUser(req) || checkIsAdmin(req)) {
      next();
    } else {
      permissionViolation(res, next);
    }
  }

  function isOrgOwner(req, res, next) {
    const Organization = models.Organization;
    const whereClause = {
      user_id: req.decoded.id,
      id: req.params.organization_id
    }

    checkAssociation(whereClause, Organization, req, res, next);
  }

  function isOrgMember(req, res, next) {
    const Organizer = models.Organizer;
    const whereClause = {
      user_id: req.decoded.id,
      organization_id: req.params.organization_id
    }
    checkAssociation(whereClause, Organizer, req, res, next);
  }

  function isUserAddress(req, res, next) {
    const whereClause = {
      user_id: req.decoded.id,
      address_id: req.params.address_id
    }
    const Model = models.UserAddress;

    checkAssociation(whereClause, Model, req, res, next);
  }

  function checkAssociation(whereClause, Model, req, res, next) {
    if (checkIsAdmin(req)) {
      next();
    } else {
      Model.findOne(whereClause)
        .then(item => {
          if (item) {
            next();
          } else {
            permissionViolation(res, next);
          }
        })
        .catch(error => serverError(res,next, error));
    }
  }

  function serverError(res, next, error) {
    const checkError = new Error('There was a server error.');
    res.json(500, {
      success: false,
      message: 'Internal Server Error.'
    });

    next(checkError);
  }

  function permissionViolation(res, next) {
    const checkError = new Error('User does not have permission to perform this action.');
    res.json(403, {
      success: false,
      message: 'Forbidden: Permission Violation.'
    });

    next(checkError);
  }

  return {
    isAdmin,
    isUser,
    isUserOrAdmin,
    isUserAddress,
    isOrgOwner,
    isOrgMember
  }
}
