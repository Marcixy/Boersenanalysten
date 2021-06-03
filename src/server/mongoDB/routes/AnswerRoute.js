const express = require('express');

const router = express.Router();

const Article = require('../models/Article');

// =============== Routes ===================

// Neue Antwort wird erstellt
router.post('/createAnswer/:articleid', (req, res) => {
    console.log("Articleid: ", req.params.articleid);
    console.log("Answerdata: ", req.body);
    const answerData = req.body;
    Article.findOneAndUpdate({_id: req.params.articleid},
    {
        $push: {
            answers: answerData,
        },
    },
    function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("New answer is successful created");
        }
    });
});

module.exports = router;