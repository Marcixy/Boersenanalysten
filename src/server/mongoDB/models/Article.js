const mongoose = require('mongoose');

// Article Schema
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: String,
    text: String,
    voting: Number,
    answerCounter: Number,
    views: Number,
    created: {
        type: String,
        default: Date.now(),
    }
});

// Model
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;