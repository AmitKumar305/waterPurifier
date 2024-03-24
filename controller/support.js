const sendEmail = require('../services/sendEmail');

const support = async (req, res) => {
    const { fullName, phoneNumber, billNumber, subject, issue } = req.body;

    sendEmail({
        fullName, phoneNumber, billNumber, subject, issue, file: req.files.file.data, fileName: req.files.file.name, type: 'support',
    });

    return res
        .status(200)
        .json({
            message: 'Success',
        });
};

module.exports = support;
