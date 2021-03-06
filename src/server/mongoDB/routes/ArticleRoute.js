const express = require('express');

const router = express.Router();

const Article = require('../models/Article');
const ArticleReference = require('../models/ArticleReference');
const User = require('../models/User');

// =============== Routes ===================

// =============== POST ===================

// Neuer Beitrag wird erstellt.
router.post('/createArticle', (req, res) => {
    const articleData = req.body;
    const newArticle = Article(articleData);
    let arrayToUpdate = "";
    newArticle.articleType === "portfolio" ? arrayToUpdate = "portfolioArticle" : arrayToUpdate = "article";
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
            voting: req.body.voting,
        },
    }).then(() => {
        User.findOne({"firebaseid": req.body.voterid}, function(error, userData) {
            if (error) {
                res.status(500).json({ msg: "Internal server error" + error });
            } else {
                let isNewArticle = true;
                let arrayToUpdate = "";
                req.body.voting == 1 ? arrayToUpdate = "upvotings" : arrayToUpdate = "downvotings";    // === funktioniert hier nicht, deshalb ==
                const newArticleReference = ArticleReference({articleid: req.params.articleid, answerids: []})
                if (eval('userData.' + arrayToUpdate + '.length') === 0) {
                    User.updateOne({"firebaseid": req.body.voterid}, 
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
                        User.updateOne({"firebaseid": req.body.voterid}, 
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
    
// Beitrag wird gel??scht und der Benutzer wird geupdatet
router.post('/deleteArticleAndUpdateUser/:articleid', (req, res) => {
    let arrayToUpdate = "";
    // Benutzer Beitragsliste updaten mit (Portfolio-)Beitrags ObjectId wird
    // entfernt und Beitrags Z??hler um 1 verringern.
    Article.find({"_id": req.params.articleid})
        .then((articleData) => {
            articleData[0].articleType === "portfolio" ? arrayToUpdate = "portfolioArticle" : arrayToUpdate = "article";
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
    // Beitrag wird nachdem der Benutzer geupdatet wurde gel??scht
    Article.deleteOne({"_id": req.params.articleid})
        .then((response) => {
            res.json({ msg: "Delete Article was successfully. " + response });
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// =============== GET ===================

// Ein einzelner Beitrag mit 10 Antworten wird anhand der _id geladen.
router.get('/getArticleById', (req, res) => {
    const startAnswerElement = (req.query.currentPage - 1) * 10;
    const endAnswerElement = ((req.query.currentPage - 1) * 10) + 10;
    Article.find({"_id": req.query.articleid}, { "answers": { $slice: [startAnswerElement, endAnswerElement]}}).then((articleData) => {
        res.status(200).json(articleData);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal server error: " + error });
    });
});

// Beitragsliste mit Daten werden nach einem Sortierkriterium und nach den eingestellten Filtern geladen.
router.get('/getArticlelist/:sortCriteria', (req, res) => {
    const titleFilterCondition = req.query.titleFilter !== '' ? { title: { $regex: req.query.titleFilter }} : {};
    const tagFilterCondition  = req.query.tagFilter !== undefined ? { tags: req.query.tagFilter } : {};
    const articleTypeFilterCondition  = req.query.articleTypeFilter !== 'all' ? { articleType: req.query.articleTypeFilter } : {};
    Article.find({...titleFilterCondition, ...tagFilterCondition, ...articleTypeFilterCondition })
        .sort({ [req.params.sortCriteria]: -1 })
        .limit(10).skip((req.query.currentPage - 1) * 10)
        .then((articleData) => {
            res.status(200).json(articleData);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });
});

// Der Erstellername eines Beitrags wird nach dem Sortierkriterium und den eingestellten Filtern geladen.
router.get('/getArticleCreatorNames/:sortCriteria', (req, res) => {
    const titleFilterCondition = req.query.titleFilter !== '' ? { title: { $regex: req.query.titleFilter }} : {};
    const tagFilterCondition  = req.query.tagFilter !== undefined ? { tags: req.query.tagFilter } : {};
    const articleTypeFilterCondition  = req.query.articleTypeFilter !== 'all' ? { articleType: req.query.articleTypeFilter } : {};
    Article.find({...titleFilterCondition, ...tagFilterCondition, ...articleTypeFilterCondition })
        .sort({ [req.params.sortCriteria]: -1 }).limit(10).skip((req.query.currentPage - 1) * 10)
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
            res.status(200).json(articleCreatorNames);
        }).catch((error) => {
            res.status(500).json({ msg: "Internal server error: " + error });
        });    
});

// Anzahl der Beitr??ge wird geladen. Die eingestellten Filter werden dabei ber??cksichtigt um
// die korrekte Seitenanzahl anzeigen lassen zu k??nnen.
router.get('/getArticleCount', (req, res) => {
    const titleFilterCondition = req.query.titleFilter !== '' ? { title: { $regex: req.query.titleFilter }} : {};
    const tagFilterCondition  = req.query.tagFilter !== undefined ? { tags: req.query.tagFilter } : {};
    const articleTypeFilterCondition  = req.query.articleTypeFilter !== 'all' ? { articleType: req.query.articleTypeFilter } : {};
    Article.countDocuments({...titleFilterCondition, ...tagFilterCondition, ...articleTypeFilterCondition }).then((articleCount) => {
        res.status(200).json(articleCount);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal server error: " + error });
    });
});

module.exports = router;