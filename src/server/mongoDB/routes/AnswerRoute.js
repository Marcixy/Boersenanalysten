const express = require('express');

const router = express.Router();

const Answer = require('../models/Answer');
const Article = require('../models/Article');

// =============== Routes ===================

// Neue Antwort wird erstellt
router.post('/createAnswer/:articleid', (req, res) => {
    console.log("ArticleId: ", req.params.articleid);
    console.log("Answerdata: ", req.body);
    Article.find({"_id": req.params.articleid})
        .then((articleData) => {
            console.log("Articledata: ", articleData);
            const article = Article(articleData);
            console.log("Article: " + article);
            const answerData = req.body;
            const newAnswer = Answer(answerData);
            console.log("Answer: " + newAnswer);
            article.update(
                { _id: req.params.articleid },
                { $push: {
                    answers: {
                    "content": answerData.content,
                    "creator": answerData.creator,
                } },
            });
            /*newAnswer.save((error) => {
            if (error) {
                res.status(500).json({ msg: "Internal server error" });
            } else {
                res.json({ msg: "Answer successfully write to MongoDB" });
            }
        })*/
    });
});

module.exports = router;