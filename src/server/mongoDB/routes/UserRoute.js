const express = require('express');

const router = express.Router();

const User = require('../models/User');

// =============== Routes ===================

// Benutzer wird registriert und erstellt
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

// Benutzerprofile laden
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

// Ein Benutzerprofil wird anhand der firebaseid geladen
router.get('/user', (req, res) => {
    User.find({"firebaseid": req.query.firebaseid})
        .then((data) => {
            console.log("Userdata: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
        });
    User.find({"_id": req.query._id})
        .then((data) => {
            console.log("Userdata: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;