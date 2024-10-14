const { faker } = require('@faker-js/faker');
const fs = require('fs');

// List of real-world medicine names and their associated categories
const medicinesList = [
  { name: 'Losartan', category: 'Heart Medicine' },
  { name: 'Ibuprofen', category: 'Pain Relief' },
  { name: 'Metformin', category: 'Diabetes Medicine' },
  { name: 'Omeprazole', category: 'Stomach Medicine' },
  { name: 'Atorvastatin', category: 'Cholesterol Medicine' },
  { name: 'Lisinopril', category: 'Blood Pressure Medicine' },
  { name: 'Sertraline', category: 'Mental Health Medicine' },
  { name: 'Amoxicillin', category: 'Antibiotic' },
  { name: 'Paracetamol', category: 'Fever Medicine' },
  { name: 'Levothyroxine', category: 'Thyroid Medicine' }
];

// Function to generate fake medicine data
const generateMedicinesData = (num) => {
  let medicines = [];

  for (let i = 0; i < num; i++) {
    const randomMedicine = faker.helpers.arrayElement(medicinesList);  // Select from real medicine names

    const medicine = {
      name: randomMedicine.name,
      developedBy: faker.company.name(),  // Random pharmaceutical company name
      maxMonthsExpiry: faker.number.int({ min: 12, max: 60 }),  // Realistic expiry range
      category: randomMedicine.category,  // Medicine category from the list
      imageUrl: faker.image.url(),  // You can replace this with predefined URLs if you prefer
      stock: faker.number.int({ min: 0, max: 2 }),  // Small stock to simulate medicine availability
      price: parseFloat(faker.commerce.price(5, 200, 2))  // Price in number format, e.g., between $5 and $200
    };

    medicines.push(medicine);
  }

  return medicines;
};

// Generate 100 fake medicines
const medicinesData = generateMedicinesData(20);

// Save the data to a JSON file
fs.writeFileSync('fake_medicines_data.json', JSON.stringify(medicinesData, null, 2), 'utf-8');

console.log('Realistic fake medicines data generated and saved to fake_medicines_data.json');
