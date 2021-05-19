const express = require('express');

const router = express.Router();

const User = require('../models/User');

// Routes
router.post('/register', (req, res) => {
    console.log("Benutzerdaten: ", req.body);
    const data = req.body;
    const newUser = User(data);
    newUser.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Sorry, internal server error" });
        } else {
            res.json({
                msg: "Benutzer wurde erfolgreich registriert."
            });
        }
    });
});

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