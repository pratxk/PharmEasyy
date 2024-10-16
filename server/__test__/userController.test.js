const request = require('supertest');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');

const testUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    ph_no: '1234567890',
};

const adminUser = {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: 'adminpassword',
    ph_no: '0987654321',
    role: 'admin', // Ensure your User model can handle this role
};

describe('User Authentication Tests', () => {
    let adminToken;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const hashedPassword = await bcrypt.hash(adminUser.password, 10);
        const createdAdmin = await User.create({ ...adminUser, password: hashedPassword });
        console.log('Admin User Created:', createdAdmin);
    });
    
    

    afterAll(async () => {
        await User.deleteMany({ email: testUser.email });
        await User.deleteMany({ email: adminUser.email });
        await blacklistModel.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: adminUser.email,
                password: adminUser.password,
            });
        
        console.log('Admin Login Response:', res.body);
        adminToken = res.body.token; // Store the admin token
    });
    

    test('Register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    test('Return error for duplicate email', async () => {
        await request(app)
            .post('/auth/register')
            .send(testUser);

        const res = await request(app)
            .post('/auth/register')
            .send(testUser);

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('User already registered');
    });

    test('Login with correct credentials', async () => {
        await request(app)
            .post('/auth/register')
            .send(testUser);

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.email).toBe(testUser.email);
    });

    test('Return error for incorrect password', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword',
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Incorrect Password');
    });

    test('Return error for non-existent user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'nonexistent@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toBe(402);
        expect(res.body.message).toBe('User does not exist');
    });

    test('Fetch current user data', async () => {
        const loginResponse = await request(app)
            .post('/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password,
            });

        const token = loginResponse.body.token;

        const res = await request(app)
            .get('/auth/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe(testUser.email);
    });

    test('Delete user by ID (admin)', async () => {
        // First register the test user to ensure they exist before deletion
        await request(app)
            .post('/auth/register')
            .send(testUser);

        const userToDelete = await User.findOne({ email: testUser.email });

        // Attempt to delete the user with the admin token
        const res = await request(app)
            .delete(`/auth/delete-user/${userToDelete._id}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');
    });

    test('Fetch all users (admin)', async () => {
        // Ensure there's at least one user (the test user) to fetch
        await request(app)
            .post('/auth/register')
            .send(testUser);

        const res = await request(app)
            .get('/auth/get-all-users/') // Ensure this matches your actual route
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    test('Logout a user', async () => {
        const loginResponse = await request(app)
            .post('/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password,
            });

        const token = loginResponse.body.token;

        const res = await request(app)
            .get('/auth/logout')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Logout Successful');
    });
});