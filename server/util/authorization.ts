export default function authorization() {

  function checkIsAdmin(req) {
    const authorization = Number(req.decoded.accessLevel);
    return (authorization === 1 || authorization === 2);
  }

  function checkIsUser(req) {
    return Number(req.decoded.id) === Number(req.params.id);
  }

  function isAdmin(req, res, next) {
    if (checkIsAdmin(req)) {
      next();
    } else {
      permissionViolation(next);
    }
  }

  function isUserOrAdmin(req, res, next) {
    if (checkIsUser(req) || checkIsAdmin(req)) {
      next();
    } else {
      permissionViolation(next);
    }
  }

  function permissionViolation(next) {
    const checkError = new Error('User does not have permission to perform this action.');
    next(checkError);
  }
  return {
    isAdmin: isAdmin,
    isUserOrAdmin: isUserOrAdmin
  }
}
