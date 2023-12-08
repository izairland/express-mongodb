const dbConnect = require('../config/dbConnect');

// get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await dbConnect.Transaction.find();
        res.json({ transactions });
    } catch (err) {
        res.json({ message: err });
    }
};

// get a transaction by id
const getTransactionById = async (req, res) => {
    try {
        const transaction = await dbConnect.Transaction.findById(req.params.id);
        res.json({ transaction });
    } catch (err) {
        res.json({ message: err });
    }
};

// add a transaction
const addTransaction = async (req, res) => {
    const {order_date, customer_name, cake_id, quantity} = req.body;
    // get cake by id
    const cake = await dbConnect.Cake.findById(cake_id);
    const transaction = new dbConnect.Transaction({
        order_date,
        customer_name,
        cake,
        quantity
    });

    try {
        const savedTransaction = await transaction.save();
        res.json({ savedTransaction });
    } catch (err) {
        res.json({ message: err });
    }
};

// update a transaction
const updateTransaction = async (req, res) => {
    try {
        const {cake_id} = req.body;
        // get cake by id
        const cake = await dbConnect.Cake.findById(cake_id);
        const updatedTransaction = await dbConnect.Transaction.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    order_date: req.body.order_date,
                    customer_name: req.body.customer_name,
                    cake,
                    quantity: req.body.quantity
                }
            }
        );
        res.json({ updatedTransaction });
    } catch (err) {
        res.json({ message: err });
    }
};

// delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const removedTransaction = await dbConnect.Transaction.remove({ _id: req.params.id });
        res.json({ removedTransaction });
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction
};