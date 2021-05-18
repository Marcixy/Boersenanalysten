const express = require('express');

const router = express.Router();

const User = require('../models/User');

// Routes
router.get('/userprofile', (req, res) => {
    User.find({ })
        .then((data) => {
            console.log("Benutzer Daten: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;