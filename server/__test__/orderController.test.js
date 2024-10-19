const request = require('supertest');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { startServer, stopServer } = require('../index'); // Adjust path as necessary
const User = require('../models/user.model');
const Medicine = require('../models/medicine.model');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');

const adminUser = {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: 'adminpassword',
    ph_no: '0987654321',
    role: 'admin',
};

const testUser = {
    first_name: 'Test',
    last_name: 'User',
    email: 'testuser@example.com',
    password: 'testpassword',
    ph_no: '1234567890',
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
let userToken;
let medicineId;
let orderId;

beforeAll(async () => {
    server = await startServer();

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const hashedAdminPassword = await bcrypt.hash(adminUser.password, 10);
    await User.create({ ...adminUser, password: hashedAdminPassword });

    const hashedUserPassword = await bcrypt.hash(testUser.password, 10);
    const user = await User.create({ ...testUser, password: hashedUserPassword });

    // Log in to get tokens
    const adminRes = await request(server)
        .post('/auth/login')
        .send({ email: adminUser.email, password: adminUser.password });
    adminToken = adminRes.body.token;

    const userRes = await request(server)
        .post('/auth/login')
        .send({ email: testUser.email, password: testUser.password });
    userToken = userRes.body.token;

    // Add test medicine
    const medicineRes = await request(server)
        .post('/medicines/add-medicine')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testMedicine);
    medicineId = medicineRes.body.newMedicine._id; // Store medicine ID for future tests
});

afterAll(async () => {
    // Remove specific orders related to the test user
    if (orderId) {
        await Order.deleteMany({ _id: orderId });
    }

    // Remove any cart items related to the test user
    await Cart.deleteMany({ email: testUser.email }); // Assuming 'userId' references the email

    // Remove the test medicine
    if (medicineId) {
        await Medicine.deleteMany({ _id: medicineId });
    }

    // Remove the test users
    await User.deleteMany({ email: { $in: [adminUser.email, testUser.email] } });

    // Close the MongoDB connection and stop the server
    await mongoose.connection.close();
    await stopServer(); // Stop the server after all tests
});

describe('Order Management Tests', () => {
    test('Place an order', async () => {
        // Add medicine to the cart first
        await request(server)
            .post('/cart/add')
            .set('Authorization', `Bearer ${userToken}`)
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
            .post('/orders/add-order')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Order placed successfully');
        orderId = res.body.order._id; // Store order ID for future tests
    });

    test('Fetch all orders (Admin only)', async () => {
        const res = await request(server)
            .get('/orders/')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(202);
        expect(Array.isArray(res.body.orders)).toBe(true);
        expect(res.body.orders.length).toBeGreaterThan(0); // Expect at least one order
    });

    test('Fetch a single order by ID (Admin only)', async () => {
        const res = await request(server)
            .get(`/orders/single-product/${orderId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.order).toHaveProperty('_id', orderId);
    });

    test('Fetch orders by user', async () => {
        const res = await request(server)
            .get('/orders/my-orders')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.orders)).toBe(true);
        expect(res.body.orders.length).toBeGreaterThan(0); // Expect at least one order
    });

    test('Update order status (Admin only)', async () => {
        const res = await request(server)
            .patch(`/orders/update-order/${orderId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ status: 'Accepted' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Order status updated');
        expect(res.body.order.status).toBe('Accepted');
    });
});
