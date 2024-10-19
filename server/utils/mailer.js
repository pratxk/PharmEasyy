const nodemailer = require('nodemailer');
const generateOrderConfirmationEmail = require('./emailGenerator');


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    }
});


const sendOrderConfirmationEmail = (userEmail, orderDetails) => {
    const mailOptions = {
        from: process.env.EMAIL, // Sender address
        to: userEmail,           // Recipient's email address
        subject: 'Order Confirmation',
        html: generateOrderConfirmationEmail(orderDetails)
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending the email', err)
        }
        else {
            console.log("Email sent successfully", info.response)
        }
    })

}

module.exports = { sendOrderConfirmationEmail }