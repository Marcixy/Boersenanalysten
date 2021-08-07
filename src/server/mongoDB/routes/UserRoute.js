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
router.post('/updateProfile', (req, res) => {
    const userData = req.body;
    User.findOneAndUpdate({"_id": userData.id},
    {
        $set: {
            username: userData.username,
            aboutMe: userData.aboutMe
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
    User.find({ })
        .then((userData) => {
            res.json(userData);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});


// Ein Benutzerprofil wird anhand der _id geladen
router.get('/getUserById', (req, res) => {
    User.find({"_id": req.query._id})
        .then((userData) => {
            res.json(userData);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Ein Benutzerprofil wird anhand der firebaseid geladen
router.get('/getUserByFirebaseid', (req, res) => {
    User.find({"firebaseid": req.query.firebaseid})
        .then((userData) => {
            res.json(userData);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Alle Beiträge eines Benutzers werden geladen
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

// Anzahl der Benutzer Beiträge wird geladen
router.get('/getUserArticleCount', async (req, res) => {
    var mongoose = require('mongoose');
    var userId = mongoose.Types.ObjectId(req.query._id);
    await User.findById(userId).populate('articles').then((user) => {
        res.json(user.article.length);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// Alle Portfoliobeiträge eines Benutzers bekommen
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

// Alle Beiträge anzeigen bei denen der Benutzer eine Antwort erstellt hat
router.get('/getUserAnswers', (req, res) => {
    User.find({"_id": req.query._id})
        .then(async (userData) => {
            var articleDataArray = [];
            for (let i = 0; i < userData[0].answers.length; i++) {
                await Article.find({"_id": userData[0].answers[i].articleid})
                .then((articleData) => {
                    articleDataArray.push(articleData[0]);
                }).catch((error) => {
                    res.status(500).json({ msg: error });
                });
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

router.get('/getUserVotings', (req, res) => {
    console.log("Current Page: " + req.query.currentPage);
    User.find({"_id": req.query._id})
        .then(async (userData) => {
            var articleDataArray = [];
            if (req.query.votingType === "Upvoting") {
                /*console.log(userData[0].upvotings);
                await Article.find({"_id": userData[0].upvotings }).sort({ "createdAt": -1 }).limit(10).skip((req.query.currentPage - 1) * 10)
                    .then((articleData) => {
                        console.log(articleData[0]);
                        if (articleData[0] !== undefined) {
                            articleDataArray.push(articleData[0]);
                        }
                    }).catch((error) => {
                        res.status(500).json({ msg: error });
                    });*/
                for (let i = 0; i < 10; i++) {
                    console.log("userData[0].upvotings.articleid: " + userData[0].upvotings[i].articleid);
                    await Article.find({"_id": userData[0].upvotings[i].articleid}).sort({ "createdAt": -1 }).limit(10).skip((req.query.currentPage - 1) * 10)
                    .then((articleData) => {
                        console.log(articleData[0]);
                        if (articleData[0] !== undefined) {
                            articleDataArray.push(articleData[0]);
                        }
                    }).catch((error) => {
                        res.status(500).json({ msg: error });
                    });
                }
            } else if (req.query.votingType === "Downvoting") {
                for (let i = 0; i < userData[0].downvotings.length; i++) {
                    await Article.find({"_id": userData[0].downvotings[i].articleid}).sort({ "createdAt": -1 }).limit(10).skip((req.query.currentPage - 1) * 10)
                    .then((articleData) => {
                        articleDataArray.push(articleData[0]);
                    }).catch((error) => {
                        res.status(500).json({ msg: error });
                    });
                }
            }
            console.log(articleDataArray);
            res.json(articleDataArray);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Anzahl der Benutzer Up Votings wird geladen
router.get('/getUserUpVotingCount', async (req, res) => {
    var mongoose = require('mongoose');
    var userId = mongoose.Types.ObjectId(req.query._id);
    await User.findById(userId).populate('upvotings').then((user) => {
        res.json(user.upvotings.length);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

// Anzahl der Benutzer Down Votings wird geladen
router.get('/getUserDownVotingCount', async (req, res) => {
    var mongoose = require('mongoose');
    var userId = mongoose.Types.ObjectId(req.query._id);
    await User.findById(userId).populate('downvotings').then((user) => {
        res.json(user.downvotings.length);
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
});

module.exports = router;