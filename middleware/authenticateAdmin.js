const jwt = require('jsonwebtoken')
const AdminModel = require('../models/admin.models.js');

const verifyJWT = async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(400).json({
            code: 400,
            message: 'Unauthorized access',
        });
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedData) {
        return res.status(400).json({
            code: 400,
            message: 'User not found',
        });
    }

    const user = await AdminModel.findById(decodedData._id);

    req.user = user;
    next();
};
module.exports = verifyJWT;
