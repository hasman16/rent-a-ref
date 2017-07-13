"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthentication(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        req.token = bearerToken;
        jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_TOKEN, function (err, decoded) {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: 'Bad token.'
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.status(403).json({
            success: false,
            message: 'No token.'
        });
    }
}
exports.default = ensureAuthentication;
//# sourceMappingURL=authentication.js.map