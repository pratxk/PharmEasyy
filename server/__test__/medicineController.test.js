const request = require('supertest');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../index');
const User = require('../models/user.model');
const Medicine = require('../models/medicine.model');

const adminUser = {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: 'adminpassword',
    ph_no: '0987654321',
    role: 'admin', // Ensure your User model can handle this role
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

describe('Medicine Management Tests', () => {
    let adminToken;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await bcrypt.hash(adminUser.password, 10);
        await User.create({ ...adminUser, password: hashedPassword });
    });

    afterAll(async () => {
        await User.deleteMany({ email: adminUser.email });
        await Medicine.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: adminUser.email,
                password: adminUser.password,
            });

        adminToken = res.body.token; // Store the admin token
    });

    test('Add a new medicine', async () => {
        const res = await request(app)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Medicine created successfully');
        expect(res.body.newMedicine).toHaveProperty('_id');
    });

    test('Fetch all medicines', async () => {
        await request(app)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const res = await request(app)
            .get('/medicines/')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.medicines)).toBe(true);
    });

    test('Fetch a single medicine by ID', async () => {
        const addRes = await request(app)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const medicineId = addRes.body.newMedicine._id;

        const res = await request(app)
            .get(`/medicines/${medicineId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(testMedicine.name);
    });

    test('Update an existing medicine', async () => {
        const addRes = await request(app)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const medicineId = addRes.body.newMedicine._id;
        const updatedMedicine = { ...testMedicine, name: 'Updated Medicine' };

        const res = await request(app)
            .patch(`/medicines/update-medicine/${medicineId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedMedicine);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Medicine updated successfully');
        expect(res.body.updatedMedicine.name).toBe('Updated Medicine');
    });

    test('Delete a medicine by ID', async () => {
        const addRes = await request(app)
            .post('/medicines/add-medicine')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testMedicine);

        const medicineId = addRes.body.newMedicine._id;

        const res = await request(app)
            .delete(`/medicines/delete-medicine/${medicineId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Medicine deleted successfully');
    });
});
