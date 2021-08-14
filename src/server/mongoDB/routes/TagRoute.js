const express = require('express');

const router = express.Router();

const Tag = require('../models/Tag');
const User = require('../models/User');

// =============== Routes ===================

// =============== POST ===================

router.post('/createTag', (req, res) => {
    const tagData = req.body;
    const newTag = Tag(tagData);
    newTag.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Internal server error by create new Tag" });
        } else {
            User.updateOne({"_id": newTag.creatorId},
            {
                $addToSet: {
                    tags: newTag._id 
                }
            }).then(() => {
                res.json(newTag);
            }).catch((error) => {
                res.status(500).json({ msg: "Internal server error by updating user " + arrayToUpdate + " array. " + error });
            });
        }
    });
});

// =============== GET ===================

router.get('/getTaglist', (req, res) => {
    console.log(req.query.currentPage - 1)
    Tag.find({ }).limit(10).skip((req.query.currentPage - 1) * 10)
        .then((tagData) => {
            res.json(tagData);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// Anzahl der Tags wird geladen
router.get('/getTagCount', (req, res) => {
    Tag.countDocuments({ }).then((tagCount) => {
        res.json(tagCount);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal server error: " + error });
    });
});

module.exports = router;