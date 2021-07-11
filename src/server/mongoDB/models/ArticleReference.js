const mongoose = require('mongoose');

// User Schema
const Schema = mongoose.Schema;
const articleReferenceSchema = new Schema({
    articleid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Article Id must exist'],
    },
    answerids: {
        type: Array,
        required: [true, 'Answers Array must exist'],
    },
},
{
    timestamps: true
});

// Model
const ArticleReference = mongoose.model('ArticleReference', articleReferenceSchema);

module.exports = ArticleReference;