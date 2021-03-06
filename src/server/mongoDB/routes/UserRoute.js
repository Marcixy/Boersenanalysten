const express = require('express');

const router = express.Router();

const User = require('../models/User');
const Article = require('../models/Article');

// =============== Routes ===================

// =============== POST ===================

// Benutzer wird registriert und in MonDB Collection users erstellt
router.post('/registerUser', (req, res) => {
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

// Benutzername und Beschreibung wird geupdatet
/*router.post('/updateProfile', (req, res) => {
    const userData = req.body;
    User.findOneAndUpdate({"_id": userData.id},
    {
        $set: {
            username: userData.username,
            aboutMe: userData.aboutMe
        }
    }).then((userData) => {
        res.status(200).json(userData);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});*/

// Benutzername und Beschreibung wird geupdatet
router.post('/updateProfile', (req, res) => {
    User.findOneAndUpdate({"_id": req.body.userid},
    {
        $set: {
            username: req.body.username,
            aboutMe: req.body.aboutMe
        }
    }).then((userData) => {
        res.status(200).json(userData);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// Email wird geupdatet
router.post('/updateEmail', (req, res) => {
    User.findOneAndUpdate({"_id": req.body.userid},
    {
        $set: {
            email: req.body.email
        }
    }).then((userData) => {
        res.status(200).json(userData);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

router.post('/updateShareCounter', (req, res) => {
    const userData = req.body;
    User.findOneAndUpdate({"_id": userData.userid},
    {
        $inc: {
            shareCounter: userData.incValue,
        }
    }).then((userData) => {
        res.json(userData);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// =============== GET ===================

// Benutzerprofile laden
router.get('/getUserprofiles', (req, res) => {
    User.find({ }).then((userData) => {
        res.json(userData);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});


// Ein Benutzerprofil wird anhand der _id geladen
router.get('/getUserById', (req, res) => {
    User.find({"_id": req.query._id}).then((userData) => {
        res.json(userData);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// Ein Benutzerprofil wird anhand der firebaseid geladen
router.get('/getUserByFirebaseid', (req, res) => {
    User.find({"firebaseid": req.query.firebaseid}).then((userData) => {
        res.json(userData);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// Alle Beitr??ge eines Benutzers werden geladen
router.get('/getUserArticles/:sortCriteria', async (req, res) => {
    await User.find({"_id": req.query._id}).then((userData) => {
        Article.find({"_id": userData[0].article}).sort({ [req.params.sortCriteria]: -1 }).limit(10).skip((req.query.currentPage - 1) * 10)
        .then((articleData) => {
            res.json(articleData);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// Anzahl der Benutzer Beitr??ge wird geladen
router.get('/getUserArticleCount', async (req, res) => {
    var mongoose = require('mongoose');
    var userId = mongoose.Types.ObjectId(req.query._id);
    await User.findById(userId).populate('articles').then((user) => {
        res.json(user.article.length);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// Alle Portfoliobeitr??ge eines Benutzers bekommen
router.get('/getUserPortfolioArticles', async (req, res) => {
    await User.find({"_id": req.query._id})
        .then((userData) => {
            Article.find({"_id": userData[0].portfolioArticle})
            .then((portfolioArticleData) => {
                res.json(portfolioArticleData);
            }).catch((error) => {
                res.status(500).json({ msg: error });
            });
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Alle Beitr??ge anzeigen bei denen der Benutzer eine Antwort erstellt hat
router.get('/getUserAnswers/:sortCriteria', (req, res) => {
    User.find({"_id": req.query._id})
        .then(async (userData) => {
            var articleDataArray = [];
            let answerMaxPagination = 0;
            let answerLength = 0;
            await User.findById(req.query._id).populate('answers').then((user) => {
                answerMaxPagination = Math.ceil(user.answers.length / 10);
                answerLength = user.answers.length;
            });
            if (answerMaxPagination == req.query.currentPage) {       // === funktioniert hier nicht, deshalb ==
                for (let i = (req.query.currentPage - 1) * 10; i < answerLength; i++) {
                    await Article.find({"_id": userData[0].answers[i].articleid}).then((articleData) => {
                        if (articleData[0] !== undefined) {
                            articleDataArray.push(articleData[0]);
                        } 
                    }).catch((error) => {
                        res.status(500).json({ msg: error });
                    });
                }
            }
            res.json(articleDataArray);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Anzahl der Benutzer Antworten wird geladen
router.get('/getUserAnswerCount', async (req, res) => {
    var mongoose = require('mongoose');
    var userId = mongoose.Types.ObjectId(req.query._id);
    await User.findById(userId).populate('answers').then((user) => {
        res.json(user.answers.length);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// TODO getUserVotings Funktion muss einem Refactoring unterzogen werden!
router.get('/getUserVotings', (req, res) => {
    User.find({"_id": req.query._id})
        .then(async (userData) => {
            var articleDataArray = [];
            if (req.query.votingType === "Upvoting") {
                let upVotingMaxPagination = 0;
                let upVotingLength = 0;
                await User.findById(req.query._id).populate('upvotings').then((user) => {
                    upVotingMaxPagination = Math.ceil(user.upvotings.length / 10);
                    upVotingLength = user.upvotings.length;
                });
                if (upVotingMaxPagination == req.query.currentPage) {       // === funktioniert hier nicht!
                    for (let i = (req.query.currentPage - 1) * 10; i < upVotingLength; i++) {
                        if (userData[0].upvotings.length !== 0) {
                            await Article.find({"_id": userData[0].upvotings[i].articleid}).then((articleData) => {
                                if (articleData[0] !== undefined) {
                                    articleDataArray.push(articleData[0]);
                                } 
                            }).catch((error) => {
                                res.status(500).json({ msg: error });
                            });
                        }
                    }
                } else {
                    for (let i = (req.query.currentPage - 1) * 10; i < ((req.query.currentPage - 1) * 10) + 10; i++) {
                        if (userData[0].upvotings.length !== 0) {
                            await Article.find({"_id": userData[0].upvotings[i].articleid}).then((articleData) => {
                                if (articleData[0] !== undefined) {
                                    articleDataArray.push(articleData[0]);
                                } 
                            }).catch((error) => {
                                res.status(500).json({ msg: error });
                            });
                        }
                    }
                }
            } else if (req.query.votingType === "Downvoting") {
                let downVotingMaxPagination = 0;
                let downVotingLength = 0;
                await User.findById(req.query._id).populate('downvotings').then((user) => {
                    downVotingMaxPagination = Math.ceil(user.downvotings.length / 10);
                    downVotingLength = user.downvotings.length;
                });
                if (downVotingMaxPagination == req.query.currentPage) {       // === funktioniert hier nicht!
                    for (let i = (req.query.currentPage - 1) * 10; i < downVotingLength; i++) {
                        if (userData[0].downvotings.length !== 0) {
                            await Article.find({"_id": userData[0].downvotings[i].articleid}).then((articleData) => {
                                if (articleData[0] !== undefined) {
                                    articleDataArray.push(articleData[0]);
                                } 
                            }).catch((error) => {
                                res.status(500).json({ msg: error });
                            });
                        }
                    }
                } else {
                    for (let i = (req.query.currentPage - 1) * 10; i < ((req.query.currentPage - 1) * 10) + 10; i++) {
                        if (userData[0].downvotings.length !== 0) {
                            await Article.find({"_id": userData[0].downvotings[i].articleid}).then((articleData) => {
                                if (articleData[0] !== undefined) {
                                    articleDataArray.push(articleData[0]);
                                } 
                            }).catch((error) => {
                                res.status(500).json({ msg: error });
                            });
                        }
                    }
                }
            }
            res.json(articleDataArray);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Anzahl der Benutzer (Up- oder Down) Votings wird geladen
router.get('/getUserVotingCount', async (req, res) => {
    var mongoose = require('mongoose');
    var userId = mongoose.Types.ObjectId(req.query._id);
    await User.findById(userId).populate(req.query.votingType).then((user) => {
        if (req.query.votingType === "upvotings") {
            res.json(user.upvotings.length);
        } else if (req.query.votingType === "downvotings") {
            res.json(user.downvotings.length);
        } else {
            res.status(500).json({ msg: "Only upvotings and downvotings type exist." });
        }
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

router.get('/isArticleVotedFromUser', async (req, res) => {
    await User.findById(req.query.userid).then(userData => {
        for (let i = 0; i < userData.upvotings.length; i++) {
            if (String(userData.upvotings[i].articleid) === req.query.articleid) {
                 return res.status(200).json("upvoted");
            }
        }
        for (let i = 0; i < userData.downvotings.length; i++) {
            if (String(userData.downvotings[i].articleid) === req.query.articleid) {
                return res.status(200).json("downvoted");
            }
        }
        return res.status(204).json("");
    });
});

router.get('/isAnswerVotedFromUser', async (req, res) => {
    await User.findById(req.query.userid).then(userData => {
        for (let i = 0; i < userData.upvotings.length; i++) {
            if (String(userData.upvotings[i].articleid) === req.query.articleid) {
                for (let j = 0; j < userData.upvotings[i].answerids.length; j++) {
                    if (String(userData.upvotings[i].answerids[j]) === req.query.answerid) {
                        return res.status(200).json("upvoted");
                    }
                }
                return res.status(204).json("");
            }
        }
        for (let i = 0; i < userData.downvotings.length; i++) {
            if (String(userData.downvotings[i].articleid) === req.query.articleid) {
                for (let j = 0; j < userData.downvotings[i].answerids.length; j++) {
                    if (String(userData.downvotings[i].answerids[j]) == req.query.answerid) {
                        return res.status(200).json("downvoted");
                    }
                }
                return res.status(204).json("");
            }
        }
        return res.status(204).json("");
    });
});

module.exports = router;