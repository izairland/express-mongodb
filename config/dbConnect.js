// connect to mongodb using mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// connect to mongodb
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const startConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
};

// create a schema

const cakeSchema = new mongoose.Schema({
    name: String,
    price: Number,
    size: String,
    description: String
});

// transaction schema, refer to cakeSchema. One transaction only has one cake.
const transactionSchema = new mongoose.Schema({
    order_date: Date,
    customer_name: String,
    // cake will be an object that has attributes cake_id, name, price, size, and description. name, price, size, and description are referred from cakeSchema.
    cake: {
        cake_id: String,
        name: String,
        price: Number,
        size: String,
        description: String
    },
    quantity: Number
});

// create a model
const Cake = mongoose.model('Cake', cakeSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// export the model
module.exports = {
    Cake,
    Transaction,
    startConnection
};