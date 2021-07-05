const express = require('express');

const router = express.Router();

const Article = require('../models/Article');
const Answer = require('../models/Answer');
const User = require('../models/User');

// =============== Routes ===================

// =============== POST ===================

// Neue Antwort wird erstellt
router.post('/createAnswer/:articleid', (req, res) => {
    const answerData = req.body;
    const newAnswer = Answer(answerData);
    // Neue Antwort für Beitrag erstellen
    Article.findOneAndUpdate({_id: req.params.articleid},
    {
        $push: {
            answers: newAnswer,
        },
        $inc: {
            answerCounter: 1,
        }
    },
    function (error) {
        if (error) {
            res.status(500).json({ msg: "Internal server error" + error });
        } else {
            console.log("New answer is successful created");
        }
    });
    // Benutzer Antwortenliste updaten mit Antwort ObjectId und
    // Antworten Zähler um 1 erhöhen.
    User.updateOne({"_id": answerData.creator}, 
    {
        $addToSet: {
            [`answers`]: newAnswer._id
        },
        $inc: { 
            answerCounter: 1,
        },
    },
    function (error) {
        if (error) {
            res.status(500).json({ msg: "Internal server error by updating user with new answer. " + error });
        } else {
            res.json({ msg: "Create Answer was successful" });
        }
    });
});

// Antwort wird up- und downgevotet
router.post('/updateAnswerVoting/:articleid', (req, res) => {
    Article.findOneAndUpdate({"_id": req.params.articleid, "answers._id": req.query.answerid},
    {
        $inc: {
            "answers.$.voting": req.query.voting,
        }
    }).then(() => {
        res.json({ msg: "Update Answer Voting was successful." });
    }).catch((error) => {
        res.status(500).json({ msg: "Internal server error: " + error });
    });
});

// =============== GET ===================

// Die Benutzernamen von den Antworten eines Beitrages werden geladen
router.get('/getAnswerCreatorNames', (req, res) => {
    Article.find({"_id": req.query.id})
        .then(async (articleData) => {
            var answerCreatorNames = [];
            for (let i = 0; i < articleData[0].answers.length; i++) {
                await User.find({"_id": articleData[0].answers[i].creator})
                .then((userData) => {
                    answerCreatorNames.push(userData[0].username);
                }).catch((error) => {
                    res.status(500).json({ msg: "Internal server error: " + error });
                });
            }
            res.json(answerCreatorNames);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// Ein einzelne Antwort wird anhand der articleid und answerid geladen
router.get('/getAnswerById', (req, res) => {
    Article.find({"_id": req.query.articleid})
        .then((articleData) => {
            for (let i = 0; i < articleData[0].answers.length; i++) {
                if (articleData[0].answers[i]._id.equals(req.query.answerid)) {
                    res.json(articleData[0].answers);
                }
            }
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

module.exports = router;