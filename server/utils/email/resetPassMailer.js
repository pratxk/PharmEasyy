const nodemailer = require('nodemailer');
const resetPassGenerator = require('./resetPassGenerator'); // Ensure correct import path

const sendResetPasswordEmail = async (userEmail, resetPasswordLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Ensure correct service name
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Password Reset Request',
            html: resetPassGenerator(resetPasswordLink),
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent successfully: ${info.response}`);
    } catch (error) {
        console.error('Error sending password reset email:', error.message || error);
    }
};

module.exports = sendResetPasswordEmail;
