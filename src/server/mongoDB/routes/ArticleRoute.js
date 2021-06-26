const express = require('express');

const router = express.Router();

const Article = require('../models/Article');
const User = require('../models/User');

// =============== Routes ===================

// Neuer Beitrag wird erstellt
router.post('/createArticle', (req, res) => {
    console.log("Articledata: ", req.body);
    const articleData = req.body;
    const newArticle = Article(articleData);
    let arrayToUpdate = "";
    newArticle.isPortfolioArticle === true ?
        arrayToUpdate = "portfolioArticle" :
        arrayToUpdate = "article";
    newArticle.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Internal server error by create Article" });
        } else {
            User.updateOne({"_id": newArticle.creator},
            {
                $addToSet: {
                    [`${arrayToUpdate}`]: newArticle._id 
                },
            },
            function (error) {
                if (error) {
                    res.status(500).json({ msg: "Internal server error by updating user " + arrayToUpdate + " array" });
                } else {
                    res.json({ msg: "Create Article was successful" });
                }
            });
        }
    });
});

// Beiträge mit Daten werden geladen
router.get('/getArticlelist', (req, res) => {
    Article.find({ })
        .then((data) => {
            console.log("Articlelist data: ", data);
            res.json(data);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

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

// Ein Beitrag wird anhand der _id geladen
router.get('/getArticleById', (req, res) => {
    Article.find({"_id": req.query.id})
        .then((data) => {
            console.log("Articledata: ", data);
            res.json(data);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// Beitrag wird up- und downgevotet
router.post('/articleVotingUpdate/:articleid', (req, res) => {
    Article.updateOne({_id: req.params.articleid},
    {
        $inc: { 
            voting: 1,
        },
    },
    function (error) {
        if (error) {
            res.status(500).json({ msg: "Internal server error: " + error });
        } else {
            res.json({ msg: "Successfully voting update" });
        }
    });
});

// Beitrag wird gelöscht
router.post('/deleteArticle/:articleid', (req, res) => {
    Article.deleteOne({_id: req.params.articleid},
        function (error) {
            if (error) {
                res.status(500).json({ msg: "Internal server error" });
            } else {
                res.json({ msg: "Delete Article was successfully" });
            }
        });
});

module.exports = router;