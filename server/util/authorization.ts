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

  function isUserOrAdmin(req, res, next) {
    if (checkIsUser(req) || checkIsAdmin(req)) {
      next();
    } else {
      permissionViolation(res, next);
    }
  }

  function orgIsOwner(req, res, next) {
    const Organization = models.Organization;
    const user_id = req.decoded.id;
    const organization_id = req.params.organization_id;

    if (checkIsAdmin(req)) {
      next();
    } else {
      Organization.findOne({
        where: {
          id: organization_id,
          user_id: user_id
        }
      })
        .then(organization => {
          if (organization) {
            next();
          } else {
            permissionViolation(res, next);
          }
        })
        .catch(error => serverError(res,next, error));
    }
  }

  function orgIsMember(req, res, next) {
    const Organizer = models.Organizer;
    const user_id = req.decoded.id;
    const organization_id = req.params.organization_id;

    if (checkIsAdmin(req)) {
      next();
    } else {
      Organizer.findOne({
        where: {
          id: organization_id,
          user_id: user_id
        }
      })
        .then(organization => {
          if (organization) {
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
    isUserOrAdmin,
    orgIsOwner,
    orgIsMember
  }
}
