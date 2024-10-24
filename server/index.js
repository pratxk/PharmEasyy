const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const userRouter = require('./routes/user.routes');
const cartRouter = require('./routes/cart.routes');
// const cookies = require('cookie-parser')
const medicineRouter = require('./routes/medicines.routes');
const orderRouter = require('./routes/order.routes');

const app = express();
const PORT = process.env.PORT || 4000 + Math.floor(Math.random() * 1000);

app.use(express.json());

const corsOptions = {


    origin: process.env.FRONT_END_URL, // Replace with your frontend's origin


    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));
// app.use(cookies());
app.get('/', (req, res) => {
    return res.status(200).send('Server is running fine');
});

app.use("/auth", userRouter);
app.use("/orders", orderRouter);
app.use('/cart', cartRouter);
app.use('/medicines', medicineRouter);

 // Keep track of the server instance

// const startServer = async () => {
//     // Check if server is already running
//     if (server) {
//         return server; // Return the existing server if it's already running
//     }

//     try {
//         await connection;
//         server = app.listen(PORT, () => {
//             console.log(`Server is running at ${PORT} & Database connected successfully`);
//         });
//     } catch (err) {
//         console.log("Trouble connecting to the DB");
//         console.log(err);
//     }
//     return server;
// };

// startServer()

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running at ${PORT} & Database connected successfully`);
    } catch (err) {
        console.log("Trouble connecting to the DB");
        console.log(err);
    }
    console.log(`Running at ${PORT} Port`);
});

// const stopServer = () => {
//     if (server) {
//         server.close();
//         console.log(`Server stopped.`);
//     } else {
//         console.log('Server not found');
//     }
// };

module.exports =  app ;
