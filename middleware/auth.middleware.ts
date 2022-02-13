const jwt = require('jsonwebtoken')
const config3 = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
       return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        const decoded = jwt.verify(token, config3.get('secretKey'))
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}