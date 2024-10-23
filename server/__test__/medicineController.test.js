const request = require('supertest');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { startServer, stopServer } = require('../index'); // Adjust path as necessary
const User = require('../models/user.model');
const Medicine = require('../models/medicine.model');

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
    adminToken = res.body.token; // Store the admin token
});

afterAll(async () => {
    await User.deleteMany({ email: adminUser.email });
    await Medicine.deleteMany({ developedBy: 'Test Company' });
    
    await mongoose.connection.close();
    await stopServer(); // Stop the server after all tests
});

describe('Medicine Management Tests', () => {
    test('Add a new medicine', async () => {
        const res = await request(server)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Medicine created successfully');
        expect(res.body.newMedicine).toHaveProperty('_id');
    });

    test('Fetch all medicines', async () => {
        await request(server)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const res = await request(server)
            .get('/medicines/')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.medicines)).toBe(true);
    });

    test('Fetch a single medicine by ID', async () => {
        const addRes = await request(server)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const medicineId = addRes.body.newMedicine._id;

        const res = await request(server)
            .get(`/medicines/${medicineId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(testMedicine.name);
    });

    test('Update an existing medicine', async () => {
        const addRes = await request(server)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const medicineId = addRes.body.newMedicine._id;
        const updatedMedicine = { ...testMedicine, name: 'Updated Medicine' };

        const res = await request(server)
            .patch(`/medicines/update-medicine/${medicineId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedMedicine);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Medicine updated successfully');
        expect(res.body.updatedMedicine.name).toBe('Updated Medicine');
    });

    test('Delete a medicine by ID', async () => {
        const addRes = await request(server)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const medicineId = addRes.body.newMedicine._id;

        const res = await request(server)
            .delete(`/medicines/delete-medicine/${medicineId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Medicine deleted successfully');
    });
});
