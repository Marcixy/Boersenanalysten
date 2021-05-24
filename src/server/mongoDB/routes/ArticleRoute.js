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
router.get('/articlelist', (req, res) => {
    Article.find({ })
        .then((data) => {
            console.log("Articledata: ", data);
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;