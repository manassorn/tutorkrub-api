var jwt = require('jsonwebtoken')

module.exports.extractUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (!err) {
              req.user = user;
            }
        });
    }
    next()
};