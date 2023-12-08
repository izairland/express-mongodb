const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cakeRouter = require('./routes/cakeRouter');
const transactionRouter = require('./routes/transactionRouter');
const dbConnect = require('./config/dbConnect');

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/cakes', cakeRouter);
app.use('/transactions', transactionRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

const port = process.env.PORT || 3000;

dbConnect.startConnection().then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});