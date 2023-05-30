const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const jwtSecret = process.env.SECRET_JWT_KEY

    const authHeader = req.headers('authorization')

    if (typeof authHeader === 'undefined') {
        return res.status(403).json({
            success: false,
            message: 'Authorization header is required to make this request'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedUserPayload = jwt.verify(token, jwtSecret)

        req.auth = decodedUserPayload
    } catch (err) {
        throw err
    }

    return next()
}

export default authMiddleware