const express = require('express');
const blogModel = require('./../models/blog');

const router = express.Router();

// CRUD Operations
router.post('/', async function (req, res) {
    const data = new blogModel({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async function (req, res) {
    try {
        const data = await blogModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async function (req, res) {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(id)
    console.log(updatedData)

    try {
        const dataUpdate = await blogModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(dataUpdate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const dataDelete = await blogModel.findByIdAndDelete(id);
        res.status(200).json(dataDelete);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;