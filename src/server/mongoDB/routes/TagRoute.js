const express = require('express');

const router = express.Router();

const Tag = require('../models/Tag');
const User = require('../models/User');

// =============== Routes ===================

// =============== POST ===================

router.post('/createTag', (req, res) => {
    const tagData = req.body;
    console.log(tagData);
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

module.exports = router;