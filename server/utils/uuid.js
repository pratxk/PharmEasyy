const { v4: uuidv4 } = require('uuid');

function generateOrderId() {
  // Generate a random UUID
  const uuid = uuidv4();

  const alphabets = uuid.replace(/[0-9-]/g, '').substring(0, 4); // Get first 4 alphabetic characters

  // Generate 5 random digits
  const numbers = Math.floor(10000 + Math.random() * 90000); // Generate 5 random digits

  // Combine the alphabets and numbers to create the orderId
  const orderId = `${alphabets}${numbers}`;

  return orderId;
}

module.exports = generateOrderId