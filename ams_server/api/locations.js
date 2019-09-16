const express = require('express');
const router = express.Router();

const queries = require('../db/location_queries');

let isValidId = (req, res, next) => {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

let validLocation = (location) => {
    const hasRoomName = typeof location.room_name == 'string' && location.room_name.trim() != '';
    return hasRoomName;
}

router.get('/', (req, res) => {
    queries.getAll().then(result => {
        res.status(200).json({success: true, locations: result});
    })
});

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOne(req.params.id).then(result => {
        if(result)
            res.status(200).json({success: true, location: result});
        else
            next();
    })
});

router.post('/', (req, res, next) => {
    if(validLocation(req.body)){
        queries.create(req.body).then(results => {
            res.status(200).json({success: true, location: results[0]});
        })
    }else{
        next(new Error('Invalid Location'));
    }
})

module.exports = router;