function generateOrderConfirmationEmail(orderDetails) {
    return `
      <!DOCTYPE html>
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="background-color: #ffffff; max-width: 700px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #000000; color: #ffffff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="font-size: 28px; margin: 0;">Order Confirmation</h1>
        </div>

        <!-- GIF -->
        <div style="text-align: center; padding: 20px;">
            <img src="https://cdn.dribbble.com/users/1200451/screenshots/8759739/ezgif.com-optimize.gif" alt="Order Confirmation" style="max-width: 100% ; height: =0%; border-radius: 8px;">
        </div>

        <!-- Order Info -->
        <div style="text-align: center; padding: 20px;">
            <h2 style="color: #333333; font-size: 24px;">Your Order ID:</h2>
            <p style="font-size: 22px; font-weight: bold; color: #333333;">${orderDetails.OrderId}</p>
            <p style="font-size: 22px; font-weight: bold; color: #000000; margin: 10px 0;">Total Amount: ${orderDetails.totalPrice}</p>

            <!-- Call to Action Button -->
            <a href='${process.env.FRONT_END_URL}/login' style="background-color: #000000; color: #ffffff; padding: 12px 24px; border: none; border-radius: 5px; text-align: center; font-size: 18px; display: inline-block; margin: 20px 0; text-decoration: none; transition: background-color 0.3s;">View Order</a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px; font-size: 14px; color: #888888;">
            <p style="margin: 5px 0;">Thank you for shopping with us!</p>
            <p style="margin: 5px 0;">If you have any questions, feel free to <a href="mailto:simpleorders24x7@gmail.com" style="color: #007bff; text-decoration: none;">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
    `;
}


module.exports = generateOrderConfirmationEmail