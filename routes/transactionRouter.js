const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// get all transactions
router.get('/', transactionController.getAllTransactions);

// get a transaction by id
router.get('/:id', transactionController.getTransactionById);

// add a transaction
router.post('/', transactionController.addTransaction);

// update a transaction
router.put('/:id', transactionController.updateTransaction);

// delete a transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;