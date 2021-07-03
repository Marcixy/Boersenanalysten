const express = require('express');

const router = express.Router();

const User = require('../models/User');
const Article = require('../models/Article');
const Answer = require('../models/Answer');

// =============== Routes ===================

// Benutzer wird registriert und erstellt
router.post('/registerUser', (req, res) => {
    console.log("Userdata: ", req.body);
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

// Benutzerprofile laden
router.get('/getUserprofiles', (req, res) => {
    User.find({ })
        .then((data) => {
            console.log("Userdata: ", data);
            res.json(data);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});


// Ein Benutzerprofil wird anhand der _id geladen
router.get('/getUserById', async (req, res) => {
    await User.find({"_id": req.query._id})
        .then((data) => {
            console.log("Userdata: ", data);
            res.json(data);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Ein Benutzerprofil wird anhand der firebaseid geladen
router.get('/getUserByFirebaseid', (req, res) => {
    User.find({"firebaseid": req.query.firebaseid})
        .then((data) => {
            console.log("Userdata: ", data);
            res.json(data);
        }).catch((error) => {
            res.status(500).json({ msg: error });
        });
});

// Alle Beiträge eines Benutzers bekommen
router.get('/getUserArticles/:sortCriteria', async (req, res) => {
    await User.find({"_id": req.query._id})
        .then((data) => {
            console.log("Userdata: ", data[0].article[0]);
            Article.find({"_id": data[0].article}).sort({ [req.params.sortCriteria]: -1 })
            .then((data) => {
                console.log("Article: ", data);
                res.json(data);
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
        .then((data) => {
            Article.find({"_id": data[0].portfolioArticle})
            .then((data) => {
                console.log("PortfolioArticle: ", data);
                res.json(data);
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