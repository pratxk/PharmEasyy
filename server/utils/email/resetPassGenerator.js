 function resetPassGenerator(resetPasswordLink) {
    return `     
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f6f6f6; color: #333; }
                    .container { padding: 20px; background-color: #ffffff; max-width: 600px; margin: 0 auto; }
                    .header { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                    .content { font-size: 16px; line-height: 1.5; }
                    .button-container { text-align: center; margin: 30px 0; }
                    .button { padding: 15px 25px; background-color: #007bff; color: #ffffff; font-weight: bold; text-decoration: none; }
                    .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Password Reset Request</div>
                    <div class="content">
                        <p>Hi there,</p>
                        <p>We received a request to reset your password. Click the button below to reset your password. If you did not request this, please ignore this email.</p>
                    </div>
                    <div class="button-container">
                        <a href="${resetPasswordLink}" class="button">Reset Your Password</a>
                    </div>
                    <div class="footer">
                        <p>If you're having trouble clicking the button, copy and paste the link below into your browser:</p>
                        <p>${resetPasswordLink}</p>
                    </div>
                </div>
            </body>
            </html>     
    `
}

module.exports = resetPassGenerator