export default new class ResponseService {

  success(res, message, status = 200) {
    res.status(status).json(message);
  }

  successCollection(res, collection, status = 200) {
    const message = {
        success: true,
        data: collection
    };

    this.success(res, message, status);
  }

  failure(res, message, status = 403) {
    res.status(status).json({
      success: false,
      message: message
    });
  }

  exception(res, error) {
    this.failure(res, 'An Internal Error Occurred', 500);
  }

  isAdmin(req) {
    const authorization = req.decoded.accessLevel;
    return (authorization === 1 || authorization === 2);
  }

  isUser(req) {
    return req.decoded.id === req.params.id;
  }

  isUserOrAdmin(req) {
    return this.isUser(req) || this.isAdmin(req);
  }

  permissionViolation(res) {
    this.failure(res, "Permissions violation.");
  }

  executeAsAdmin(req, res, callback) {
    if (this.isAdmin(req)) {
      callback();
    } else {
      this.permissionViolation(res);
    }
  }
}
