const mongoose = require('mongoose');

const ArticleReference = require('../models/ArticleReference');

// User Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firebaseid: {
        type: String,
        required: [true, 'Unique User Id must exist'],
    },
    email: {
        type: String,
        required: [true, 'User E-Mail must exist'],
    },
    username: {
        type: String,
        required: [true, 'Username must exist'],
    },
    shareCounter: {
        type: Number,
        default: 0,
        required: [true, 'Share Counter must exist'],
        min: [0, 'User can not have less than {VALUE} share counter'],
    },
    articleCounter: {
        type: Number,
        default: 0,
        required: [true, 'Article Counter must exist'],
        min: [0, 'User can not have less than {VALUE} article counter'],
    },
    answerCounter: {
        type: Number,
        default: 0,
        required: [true, 'Answer Counter must exist'],
        min: [0, 'User can not have less than {VALUE} answer counter'],
    },
    aboutMe: {
        type: String,
        default: "",
    },
    portfolioArticle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    }],
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    }],
    answers: [ArticleReference.schema],
    upvotings: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    downvotings: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }]
},
{
    timestamps: true
});

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;