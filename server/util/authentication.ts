import * as jwt from 'jsonwebtoken';

function ensureAuthentication(req, res, next) {
    let bearerToken;
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.SECRET_TOKEN, function(err, decoded) {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: 'Bad token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({
            success: false,
            message: 'No token.'
        });
    }
}

export default ensureAuthentication;
