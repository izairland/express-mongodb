const express = require('express');
const router = express.Router();
const cakeController = require('../controllers/cakeController');

// get all cakes
router.get('/', cakeController.getAllCakes);

// get a cake by id
router.get('/:id', cakeController.getCakeById);

// add a cake
router.post('/', cakeController.addCake);

// update a cake
router.put('/:id', cakeController.updateCake);

// delete a cake
router.delete('/:id', cakeController.deleteCake);

module.exports = router;