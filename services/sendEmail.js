const nodemailer = require('nodemailer');

const sendContactUsEmail = async ({
    fullName = '', phoneNumber = '', alternatePhoneNumber = '', subject = '', issue = '', billNumber = '', file, fileName, type,
}) => {
    const transpoter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.BUSINESS_EMAIL,
            pass: process.env.BUSINESS_PASSWORD,
        },
        secure: false,
        port: 25, 
        tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {};
    if (type === 'contactUs') {
        mailOptions = {
            from: '',
            to: process.env.BUSINESS_EMAIL,
            subject: 'Contact Us Form',
            text: `
                Name: ${fullName}
                Phone Number: ${phoneNumber}
                Alternate Phone Number: ${alternatePhoneNumber}
                Subject: ${subject}
                Issue: ${issue}
            `,
        };
    } else {
        mailOptions = {
            from: '',
            to: process.env.BUSINESS_EMAIL,
            subject: 'Support Form',
            text: `
                Name: ${fullName}
                Phone Number: ${phoneNumber}
                Bill Number: ${billNumber}
                Subject: ${subject}
                Issue: ${issue}
            `
        };
        if (file && fileName) {
            mailOptions.attachments = [
                {
                  filename: fileName,
                  content: file,
                },
            ];
        }
    }

    await transpoter.sendMail(mailOptions);
};

module.exports = sendContactUsEmail;
