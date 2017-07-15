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
    console.log('error:', error);
    res.status(500).json({
      success: false,
      message: 'An Internal Error Occurred'
    });
  }
}
