const express = require('express');

const router = express.Router();

const Article = require('../models/Article');
const ArticleReference = require('../models/ArticleReference');
const User = require('../models/User');


// =============== Routes ===================

// =============== POST ===================

// Neuer Beitrag wird erstellt
router.post('/createArticle', (req, res) => {
    const articleData = req.body;
    const newArticle = Article(articleData);
    let arrayToUpdate = "";
    newArticle.isPortfolioArticle === true ? arrayToUpdate = "portfolioArticle" : arrayToUpdate = "article";
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
            }).then(() => {
                res.json(newArticle);
            }).catch((error) => {
                res.status(500).json({ msg: "Internal server error by updating user " + arrayToUpdate + " array. " + error });
            });
        }
    });
});

// Beitrag wird up- und downgevotet
router.post('/updateArticleVoting/:articleid', (req, res) => {
    Article.updateOne({"_id": req.params.articleid},
    {
        $inc: { 
            voting: req.query.voting,
        },
    }).then(() => {
        console.log("req.query.voterid: " + req.query.voterid);
        User.findOne({"firebaseid": req.query.voterid}, function(error, userData) {
            if (error) {
                res.status(500).json({ msg: "Internal server error" + error });
            } else {
                let isNewArticle = true;
                let arrayToUpdate = "";
                // === funktioniert hier nicht!
                req.query.voting == 1 ? arrayToUpdate = "upvotings" : arrayToUpdate = "downvotings";
                const newArticleReference = ArticleReference({articleid: req.params.articleid, answerids: []})
                if (eval('userData.' + arrayToUpdate + '.length') === 0) {
                    User.updateOne({"firebaseid": req.query.voterid}, 
                        {
                            $addToSet: {
                                [`${arrayToUpdate}`]: newArticleReference,
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
                else {
                    for (let i = 0; i < eval('userData.' + arrayToUpdate + '.length'); i++) {   
                        if (eval('userData.' + arrayToUpdate + '[i].articleid.equals(req.params.articleid)')) {
                            isNewArticle = false;
                            break;
                        } 
                    }
                    if (isNewArticle === true) {
                        User.updateOne({"firebaseid": req.query.voterid}, 
                        {
                             $push: {
                                [`${arrayToUpdate}`]: newArticleReference,
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
            }
        })
        res.json({ msg: "Update Article Voting was successful." });
    }).catch((error) => {
        res.status(500).json({ msg: "Internal server error: " + error });
    });
});
    
// Beitrag wird gelöscht und der Benutzer wird geupdatet
router.post('/deleteArticleAndUpdateUser/:articleid', (req, res) => {
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
            }).then(() => {
                res.json({ msg: "Update Article was successful." });
            }).catch((error) => {
                res.status(500).json({ msg: "Internal server error: " + error });
            });
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
    // Beitrag wird nachdem der Benutzer geupdatet wurde gelöscht
    Article.deleteOne({"_id": req.params.articleid})
        .then((response) => {
            res.json({ msg: "Delete Article was successfully. " + response });
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// =============== GET ===================

// Der Erstellername eines Beitrags wird geladen
router.get('/getArticleCreatorNames/:sortCriteria', (req, res) => {
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

// Beitragsliste mit Daten werden nach einem Sortierkriterium geladen
router.get('/getArticlelist/:sortCriteria', (req, res) => {
    Article.find({ }).sort({ [req.params.sortCriteria]: -1 }).limit(5).skip((req.query.currentPage - 1) * 5)
        .then((data) => {
            res.json(data);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// Ein einzelner Beitrag wird anhand der _id geladen
router.get('/getArticleById', (req, res) => {
    Article.find({"_id": req.query.articleid})
        .then((articleData) => {
            res.json(articleData);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// Anzahl der Beiträge wird geladen
router.get('/getArticleCount', (req, res) => {
    Article.countDocuments({ })
        .then((articleCount) => {
            res.json(articleCount);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

module.exports = router;


/*else {
                            if (userData.upvotings[i].articleid.equals(req.params.articleid)) {
                                User.updateOne({"firebaseid": req.query.voterid}, 
                                {
                                    $push: {
                                        upvotings: newArticleReference,
                                    },
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
                        }*/