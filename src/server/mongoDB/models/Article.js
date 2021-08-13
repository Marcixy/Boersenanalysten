const mongoose = require('mongoose');

const Answer = require('../models/Answer');

// Article Schema
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Article title must exist'],
    },
    content: {
        type: String,
        required: [true, 'Article content must exist'],
    },
    tags: {
        type: Array,
        required: [true, 'Article tags must exist'],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Article creator must exist'],
    },
    voting: {
        type: Number,
        default: 0,
        required: [true, 'Article voting must exist'],
    },
    answerCounter: {
        type: Number,
        default: 0,
        required: [true, 'Article answer counter must exist'],
        min: [0, 'Article can not have less than 0 answers'],
    },
    views: {
        type: Number,
        default: 0,
        required: [true, 'Article views must exist'],
        min: [0, 'Article can not have less than 0 views'],
    },
    articleType: {
        type: String,
        required: [true, 'Article type must exist'],
    },
    answers: [Answer.schema],
},
{
    timestamps: true
});

// Model
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;