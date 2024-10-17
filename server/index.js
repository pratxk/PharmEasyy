const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const userRouter = require('./routes/user.routes');
const cartRouter = require('./routes/cart.routes');
const medicineRouter = require('./routes/medicines.routes');
const orderRouter = require('./routes/order.routes');

const app = express();
const PORT = process.env.PORT || 4000 + Math.floor(Math.random() * 1000);

app.use(express.json());

const corsOptions = {
    origin: '*', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    return res.status(200).send('Server is running fine');
});

app.use("/auth", userRouter);
app.use("/orders", orderRouter);
app.use('/cart', cartRouter);
app.use('/medicines', medicineRouter);

let server;

const startServer = async () => {
    try {
        await connection;
        server = app.listen(PORT, () => {
            console.log(`Server is running at ${PORT} & Database connected successfully`);
        });
    } catch (err) {
        console.log("Trouble connecting to the DB");
        console.log(err);
    }
    return server;
};
startServer();

const stopServer = () => {
    if (server) {
        server.close();
        console.log(`Server stopped.`);
    }
};

module.exports = { startServer, stopServer, app };
