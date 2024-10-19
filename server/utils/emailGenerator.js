function generateOrderConfirmationEmail(orderDetails) {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #000000;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
        }
        .order-info {
            text-align: center;
            padding: 20px;
        }
        .order-info h2 {
            color: #333333;
            font-size: 20px;
        }
        .order-info p {
            font-size: 18px;
            color: #555555;
        }
        .order-info .order-id {
            font-size: 22px;
            font-weight: bold;
            color: #333333;
        }
        .order-info .total-amount {
            font-size: 22px;
            font-weight: bold;
            color: #000000;
            margin: 10px 0;
        }
        .cta-button {
            background-color: #000000;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            text-align: center;
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #888888;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>Order Confirmation</h1>
        </div>

        <!-- Order Info -->
        <div class="order-info">
            <h2>Your Order ID:</h2>
            <p class="order-id">${orderDetails.OrderId}</p>

            <p class="total-amount">Total Amount: ${orderDetails.totalPrice}</p>

            <!-- Call to Action Button -->
            <a href="#" class="cta-button">View Order</a>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, feel free to <a href="mailto:support@shop.com">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
    `;
}


module.exports = generateOrderConfirmationEmail