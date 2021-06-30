const express = require('express');

const router = express.Router();

const Article = require('../models/Article');
const User = require('../models/User');

// =============== Routes ===================

// =============== POST ===================

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
                $inc: { 
                    articleCounter: 1,
                },
            },
            function (error) {
                if (error) {
                    res.status(500).json({ msg: "Internal server error by updating user " + arrayToUpdate + " array" });
                } else {
                    res.json(newArticle);
                }
            });
        }
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
    let arrayToUpdate = "";
    // Benutzer Beitragsliste updaten mit (Portfolio-)Beitrags ObjectId wird
    // entfernt und Beitrags Zähler um 1 verringern.
    Article.find({"_id": req.params.articleid})
    .then((articleData) => {
        articleData[0].isPortfolioArticle === true ?
            arrayToUpdate = "portfolioArticle" :
            arrayToUpdate = "article";
        User.findOneAndUpdate({"_id": articleData[0].creator},
        {
            $pull: {
                [`${arrayToUpdate}`]: articleData[0]._id
            },
            $inc: {
                articleCounter: -1,
            }
        },
        function (error) {
            if (error) {
                res.status(500).json({ msg: "Internal server error" + error });
            } else {
                console.log("Update Article was successful");
            }
        });
    });
    // Beitrag wird gelöscht
    Article.deleteOne({"_id": req.params.articleid},
        function (error) {
            if (error) {
                res.status(500).json({ msg: "Internal server error" });
            } else {
                res.json({ msg: "Delete Article was successfully" });
            }
        });
});

// =============== GET ===================

// Der Erstellername eines Beitrags wird geladen
router.get('/getArticleCreatorNames/:sortCriteria', async (req, res) => {
    Article.find({ }).sort({ [req.params.sortCriteria]: -1 })
        .then(async (articleData) => {
            var articleCreatorNames = [];
            for (let i = 0; i < articleData.length; i++) {
                await User.find({"_id": articleData[i].creator})
                .then((userData) => {
                    articleCreatorNames.push(userData[0].username);
                }).catch((error) => {
                    res.status(500).json({ msg: "Internal server error: " + error });
                });
            }
            res.json(articleCreatorNames);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });    
});

// Beiträge mit Daten werden geladen
router.get('/getArticlelist/:sortCriteria', (req, res) => {
    Article.find({ }).sort({ [req.params.sortCriteria]: -1 })
        .then((data) => {
            console.log("Articlelist data: ", data);
            res.json(data);
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

module.exports = router;