const jwt = require('jsonwebtoken');
const middlewareConfig = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log('token1',req.headers.authorization)
        if (!token) {
            console.log('token2',token)
            return res.status(401).json({ message: 'Auth error' });
        }
        console.log('token3',token)
        const decoded = jwt.verify(token, middlewareConfig.get('jwtSecret'));
        console.log('token4',decoded)
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e)
        return res.status(401).json({ message: 'Auth error' });
    }
};
