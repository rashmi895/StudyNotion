exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Payment Successful</title>
    </head>
    <body style="font-family: Arial, sans-serif; color: #222;">
      <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2>Payment Successful</h2>
        <p>Hello ${name},</p>
        <p>Your payment has been received successfully.</p>
        <p><strong>Amount:</strong> Rs. ${amount}</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p>You can now continue learning on StudyNotion.</p>
      </div>
    </body>
  </html>`;
};
