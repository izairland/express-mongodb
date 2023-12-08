const dbConnect = require('../config/dbConnect');

// get all cakes
const getAllCakes = async (req, res) => {
    try {
        const cakes = await dbConnect.Cake.find();
        res.json({ cakes });
    } catch (err) {
        res.json({ message: err });
    }
};

// get a cake by id
const getCakeById = async (req, res) => {
    try {
        const cake = await dbConnect.Cake.findById(req.params.id);
        res.json({ cake });
    } catch (err) {
        res.json({ message: err });
    }
};

// add a cake
const addCake = async (req, res) => {
    const cake = new dbConnect.Cake({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description
    });

    try {
        const savedCake = await cake.save();
        res.json({ savedCake });
    } catch (err) {
        res.json({ message: err });
    }
};

// update a cake
const updateCake = async (req, res) => {
    try {
        const updatedCake = await dbConnect.Cake.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    size: req.body.size,
                    description: req.body.description
                }
            }
        );
        res.json({ updatedCake });
    } catch (err) {
        res.json({ message: err });
    }
};

// delete a cake
const deleteCake = async (req, res) => {
    try {
        const removedCake = await dbConnect.Cake.remove({ _id: req.params.id });
        res.json({ removedCake });
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    getAllCakes,
    getCakeById,
    addCake,
    updateCake,
    deleteCake
};