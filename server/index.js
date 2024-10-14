const dotenv = require('dotenv').config();
const express = require('express');
const app = express()
const PORT = process.env.PORT;
const cors = require('cors');
const connection = require('./config/db');
const userRouter = require('./routes/user.routes');
const cartModel = require('./models/cart.model');
const medicineModel = require('./models/medicine.model');
const medicineRouter = require('./routes/medicines.routes');
const cartRouter = require('./routes/cart.routes');
const orderRouter = require('./routes/order.routes');


app.use(express.json());

const corsOptions = {
    origin: '*', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    return res.status(200).send('Server is running fine');
});

app.use("/auth", userRouter);
app.use("/orders", orderRouter);
app.use('/cart',cartRouter);
app.use('/medicines',medicineRouter);



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