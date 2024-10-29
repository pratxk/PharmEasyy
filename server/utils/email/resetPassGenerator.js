function resetPassGenerator(resetPasswordLink) {
    return `     
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f6f6f6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #000000; color: #ffffff; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Password Reset Request</h1>
        </div>
        <div style="text-align: center; padding: 20px;">
            <img src="https://cdn-icons-gif.flaticon.com/11186/11186762.gif" alt="Reset Password" style="max-width: 50%; height: auto; border-radius: 8px;">
        </div>
        <div style="padding: 20px; font-size: 16px; line-height: 1.6; text-align: center;">
            <p style="margin: 0 0 15px;">Hi there,</p>
            <p style="margin: 0 0 15px;">We received a request to reset your password. Click the button below to reset your password. If you did not request this, please ignore this email.</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetPasswordLink}" style="padding: 15px 30px; background-color: #28a745; color: #ffffff; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block; transition: background-color 0.3s, transform 0.3s; font-size: 18px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">Reset Your Password</a>
        </div>
        <div style="font-size: 14px; color: #777; text-align: center; padding: 20px;">
            <p style="margin: 0;">If you're having trouble clicking the button, copy and paste the link below into your browser:</p>
            <p style="margin: 10px 0; word-break: break-all; color: #007bff;">${resetPasswordLink}</p>
        </div>
        <div style="font-size: 12px; color: #999; text-align: center; padding: 10px;">
            <p style="margin: 0;">Thank you for using our service!</p>
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
     
    `;
}

module.exports = resetPassGenerator;
