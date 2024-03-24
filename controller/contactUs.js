const sendEmail = require('../services/sendEmail');

const contactUs = async (req, res) => {
    const { fullName, phoneNumber, alternatePhoneNumber, subject, issue } = req.body;

    sendEmail({
        fullName, phoneNumber, alternatePhoneNumber, subject, issue, type: 'contactUs',
    });

    return res
        .status(200)
        .json({
            message: 'Success',
        });
};

module.exports = contactUs;
