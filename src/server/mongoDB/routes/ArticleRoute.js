const express = require('express');

const router = express.Router();

const Article = require('../models/Article');

// =============== Routes ===================

// Neuer Beitrag wird erstellt
router.post('/createArticle', (req, res) => {
    console.log("Articledata: ", req.body);
    const articleData = req.body;
    const newArticle = Article(articleData);
    newArticle.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Internal server error" });
        } else {
            res.json({ msg: "Article successfully write to MongoDB" });
        }
    });
});

// Beiträge mit Daten werden geladen
router.get('/getArticlelist', (req, res) => {
    Article.find({ })
        .then((data) => {
            console.log("Articlelist data: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
        });
});

// Ein Beitrag wird anhand der _id geladen
router.get('/getArticleById', (req, res) => {
    Article.find({"_id": req.query.id})
        .then((data) => {
            console.log("Articledata: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
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
            res.status(500).json({ msg: "Internal server error" });
        } else {
            res.json({ msg: "Successfully voting update" });
        }
    });
});

module.exports = router;