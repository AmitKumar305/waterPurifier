const AdminModel = require('../models/admin.models.js');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Email is required',
        });
    }

    const admin = await AdminModel.findOne({
        email,
    });
    if (!admin) {
        return res.status(400).json({
            message: 'Admin not found',
        });
    }

    const isValidPassword = await admin.isPasswordCorrect(password);

    if (!isValidPassword) {
        return res.status(400).json({
            message: 'Invalid password',
        });
    }

    const accessToken = await admin.generateAccessToken();

    return res
        .status(200)
        .json({
            message: 'Admin logged in successfully',
            accessToken,
        });
};


module.exports =  adminLogin;
