export default new class ResponseService {

  success(res, message) {
    res.status(200).json(message);
  }

  failure(res, message) {
    res.status(403).json({
      success: false,
      message: message
    });
  }

  exception(res, error) {
    res.status(500).json({
      success: false,
      message: 'An Internal Error Occurred'
    });
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
