import * as jwt from 'jsonwebtoken';

function ensureAuthentication(req, res, next) {
    let bearerToken;
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.SECRET_TOKEN, function(
            err,
            decoded
        ) {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Validation Error: New login required.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Validation Error: Login required.'
        });
    }
}

export default ensureAuthentication;
