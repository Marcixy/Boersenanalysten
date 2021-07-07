const express = require('express');

const router = express.Router();

const User = require('../models/User');
const Article = require('../models/Article');
const Answer = require('../models/Answer');

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
    await User.find({"_id": req.query._id})
        .then((userData) => {
            Article.find({"_id": userData[0].article}).sort({ [req.params.sortCriteria]: -1 })
            .then((articleData) => {
                res.json(articleData);
            }).catch((error) => {
                res.status(500).json({ msg: error });
            });
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
})

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
})

// TODO hier weitermachen
router.get('/getUserAnswers/', (req, res) => {
    console.log("ID: " + req.query._id);
    User.find({"_id": req.query._id})
    .then((userData) => {
        console.log("Answers Data: " + userData[0].answers[0]);
        Answer.find({"_id": userData[0].answers[0]})
        .then((answerData) => {
            console.log("Answers Data: ", answerData);
            Article.find({"_id": answerData[0].articleid})
            .then((articleData) => {
                console.log("Article: ", articleData);
                res.json(articleData);
            }).catch((error) => {
                res.status(500).json({ msg: error });
            });
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
    }).catch((error) => {
        res.status(500).json({ msg: error });
    });
})

module.exports = router;