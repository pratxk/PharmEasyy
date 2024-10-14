const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized Access...Please Login First' });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SecretKEY, function (err, decoded) {
            if (err) {
                return res.status(403).json({ message: 'Invalid Token...Please Login Again' });
            }
            req.user = decoded;
            next()
        })
    } catch (error) {
        res.status(405).json({
            message: 'Unauthorized user....Something went wrong!'
        })
    }
}

module.exports = auth;