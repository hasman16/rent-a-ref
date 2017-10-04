"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function ensureAuthentication(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.SECRET_TOKEN, function (err, decoded) {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Validation Error: New login required.'
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Validation Error: Login required.'
        });
    }
}
exports.default = ensureAuthentication;
//# sourceMappingURL=authentication.js.map