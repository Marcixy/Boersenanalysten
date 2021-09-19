const express = require('express');

const router = express.Router();

const Article = require('../models/Article');
const ArticleReference = require('../models/ArticleReference');
const Answer = require('../models/Answer');
const User = require('../models/User');


// =============== Routes ===================

// =============== POST ===================

// Neue Antwort wird erstellt
router.post('/createAnswer/:articleid', (req, res) => {
    console.log("req.params.articleid: " + req.params.articleid);
    console.log("answerData: " + req.body);
    const answerData = req.body;
    const newAnswer = Answer(answerData);
    // Neue Antwort für Beitrag erstellen
    Article.findOneAndUpdate({"_id": req.params.articleid},
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
            console.log("New answer was successful pushed");
        }
    });
    User.findOne({"_id": newAnswer.creator}, function(error, userData) {
        if (error) {
            res.status(500).json({ msg: "Internal server error" + error });
        } else {
            // Benutzer Antwortenliste updaten mit neuer Antwort ObjectId
            let isNewArticle = true;
            const newArticleReference = ArticleReference(answerData)
            for (let i = 0; i < userData.answers.length; i++) {
                if (userData.answers[i].articleid.equals(req.params.articleid)) {
                    isNewArticle = false;
                    User.updateOne({"_id": answerData.creator}, 
                    {
                        $push: {
                            "answers.$[i].answerids": newAnswer._id,
                        }
                    },
                    { 
                        arrayFilters: [{ "i.articleid": req.params.articleid }],
                        new: true
                    },
                    function (error) {
                        if (error) {
                            res.status(500).json({ msg: "Internal server error by updating user with new answer. " + error });
                        } else {
                            console.log("Updating user was successful");
                        }
                    });
                } 
            }
            if (isNewArticle === true) {
                const answersLength = userData.answers.length;
                User.updateOne({"_id": answerData.creator}, 
                {
                    $push: {
                        answers: newArticleReference,
                    }
                },
                function (error) {
                    if (error) {
                        res.status(500).json({ msg: "Internal server error by updating user with new answer. " + error });
                    } else {
                        User.updateOne({"_id": answerData.creator}, 
                        {
                            $push: {
                                "answers.$[answersLength].answerids": newAnswer._id,
                            }
                        },
                        { 
                            arrayFilters: [{ "answersLength.articleid": req.params.articleid }],
                            new: true
                        },
                        function (error) {
                            if (error) {
                                res.status(500).json({ msg: "Internal server error by updating user with new answer. " + error });
                            } else {
                                console.log("Updating user was successful");
                                res.json({ msg: "Create Answer was successful" });
                            }
                        });
                    }
                });
            }
        }
    });
});

// Antwort wird up- und downgevotet
router.post('/updateAnswerVoting/:articleid', (req, res) => {
    Article.findOneAndUpdate({"_id": req.params.articleid, "answers._id": req.body.answerid},
    {
        $inc: {
            "answers.$.voting": req.body.voting,
        }
    }).then(() => {
        let arrayToUpdate = "";
        req.body.voting == 1 ? arrayToUpdate = "upvotings" : arrayToUpdate = "downvotings";
        arrayToUpdate = arrayToUpdate + ".$[i].answerids";
        User.findOneAndUpdate({"firebaseid": req.body.voterid},
        {
            $addToSet: {
                [arrayToUpdate]: req.body.answerid
            }
        },
        {
            arrayFilters: [{ "i.articleid": req.params.articleid }],
        }, 
        function (error) {
            if (error) {
                res.status(500).json({ msg: "Internal server error by updating user with new answer. " + error });
            } else {
                console.log("Update Answer Voting was successful.");
                res.json({ msg: "Update Answer Voting was successful." });
            }
        });
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
    Article.find({"_id": req.query.articleid}).then((articleData) => {
        for (let i = 0; i < articleData[0].answers.length; i++) {
            if (articleData[0].answers[i]._id.equals(req.query.answerid)) {
                console.log("articleData[0].answers[i]: " + articleData[0].answers[i]);
                res.json(articleData[0].answers[i]);
            }
        }
    }).catch((error) => {
        res.status(500).json({ msg: "Internal server error: " + error });
    });
});

module.exports = router;