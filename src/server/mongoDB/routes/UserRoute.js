const express = require('express');

const router = express.Router();

const User = require('../models/User');

// Routes
router.post('/register', (req, res) => {
    console.log("Userdata: ", req.body);
    const userData = req.body;
    const newUser = User(userData);
    newUser.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Internal server error" });
        } else {
            res.json({ msg: "User successfully write to MongoDB" });
        }
    });
});

router.get('/userprofile', (req, res) => {
    User.find({ })
        .then((data) => {
            console.log("Userdata: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;