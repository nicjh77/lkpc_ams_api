const express = require('express');
const router = express.Router();

const queries = require('../db/location_queries');

router.get('/', (req, res) => {
    queries.getAll().then(result => {
        res.status(200).json({success: true, locations: result});
    })
});

// id값을 어떻게 전달???
router.get('/:id', (req, res) => {
    queries.getOne().then(result => {
        res.status(200).json({success: true, location: result});
    })
});

module.exports = router;