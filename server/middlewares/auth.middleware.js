const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

const auth = async (req, res, next) => {
    try {
        // const authHeader = req.headers.authorization;
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return res.status(401).json({ message: 'Unauthorized Access...Please Login First' });
        // }
        // const token = authHeader.split(' ')[1];
        const token = req.cookies.token;
        const blacklistedToken = await blacklistModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Unauthorized Access...Please Login First' });
        }
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