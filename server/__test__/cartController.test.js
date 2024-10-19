const request = require('supertest');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { startServer, stopServer } = require('../index'); // Adjust path as necessary
const User = require('../models/user.model');
const Medicine = require('../models/medicine.model');
const Cart = require('../models/cart.model');

const adminUser = {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: 'adminpassword',
    ph_no: '0987654321',
    role: 'admin',
};

const testMedicine = {
    name: 'Test Medicine',
    developedBy: 'Test Company',
    maxMonthsExpiry: 12,
    category: 'Pain Relief',
    imageUrl: 'http://example.com/image.png',
    stock: 100,
    price: 9.99,
};

let server;
let adminToken;
let medicineId;

beforeAll(async () => {
    server = await startServer();

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    await User.create({ ...adminUser, password: hashedPassword });

    // Log in to get admin token
    const res = await request(server)
        .post('/auth/login')
        .send({
            email: adminUser.email,
            password: adminUser.password,
        });
    adminToken = res.body.token;

    // Add test medicine for cart tests
    const medicineRes = await request(server)
        .post('/medicines/add-medicine')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testMedicine);
    medicineId = medicineRes.body.newMedicine._id; // Store medicine ID for future tests
});

afterAll(async () => {
    // Remove specific cart items related to the test
  
    
    // Remove the test medicine
    if (medicineId) {
        await Medicine.deleteMany({ _id: medicineId });
    }

    // Remove the test user
    await User.deleteMany({ email: adminUser.email });

    // Close the MongoDB connection and stop the server
    await mongoose.connection.close();
    await stopServer(); // Stop the server after all tests
});

describe('Cart Management Tests', () => {
    let cartItemId;

    test('Add medicine to cart', async () => {
        const res = await request(server)
            .post('/cart/add')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                medicineId,
                name: testMedicine.name,
                developedBy: testMedicine.developedBy,
                maxMonthsExpiry: testMedicine.maxMonthsExpiry,
                category: testMedicine.category,
                imageUrl: testMedicine.imageUrl,
                price: testMedicine.price,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Medicine added to cart');
        cartItemId = res.body.cartItem._id; // Store cart item ID for future tests
    });

    test('Fetch cart items', async () => {
        const res = await request(server)
            .get('/cart/')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0); // Expect at least one item in cart
    });

    test('Update cart item quantity', async () => {
        const res = await request(server)
            .patch(`/cart/update/${cartItemId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ operation: 'increment' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Cart item updated');
        expect(res.body.updatedItem.qty).toBe(2); // Assuming default qty is 1
    });

    test('Remove medicine from cart', async () => {
        const res = await request(server)
            .delete(`/cart/remove/${cartItemId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Medicine removed from cart');
    });

    test('Clear cart', async () => {
        await request(server)
            .post('/cart/add')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                medicineId,
                name: testMedicine.name,
                developedBy: testMedicine.developedBy,
                maxMonthsExpiry: testMedicine.maxMonthsExpiry,
                category: testMedicine.category,
                imageUrl: testMedicine.imageUrl,
                price: testMedicine.price,
            });

        const res = await request(server)
            .delete('/cart/clear')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Cart cleared successfully');
    });
});
