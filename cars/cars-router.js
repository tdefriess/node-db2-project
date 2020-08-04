const express = require('express');
const db = require('../data/connection');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to retrieve cars'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where({ id }).first()
        .then(car => {
            if (car) {
                res.json(car);
            } else {
                res.status(404).json({message: 'that car does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({message: "failed to retrieve car"})
        })
})

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
        .then(ids => {
            db('cars').where({ id: ids[0] })
            .then(newCar => {
                res.status(201).json(newCar);
            })
            .catch(err => {
                res.status(500).json({message: 'error'})
            })
        })
        .catch(err => {
            res.status(500).json({message: 'error adding car'})
        })
})

module.exports = router;