const mongoose = require('mongoose');

// Article Schema
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Article title must exist'],
    },
    content: String,
    tags: {
        type: String,
        required: [true, 'Article tags must exist'],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Article creator must exist'],
    },
    voting: {
        type: Number,
        required: [true, 'Article voting must exist'],
    },
    answerCounter: {
        type: Number,
        required: [true, 'Article answer counter must exist'],
        min: [0, 'Article can not have less than 0 answers'],
    },
    views: {
        type: Number,
        required: [true, 'Article views must exist'],
        min: [0, 'Article can not have less than 0 views'],
    },
    created: {
        type: String,   // Date
        required: [true, 'Article creation date must exist'],
        default: Date.now(),
    }
});

// Model
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;