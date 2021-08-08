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
        index: true,
    }],
    answers: [{
        type: ArticleReference.schema,
        index: true,
    }],
    upvotings: [{
        type: ArticleReference.schema,
        index: true,
    }],
    downvotings: [{
        type: ArticleReference.schema,
        index: true,
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }]
},
{
    timestamps: true
});

userSchema.virtual('articleCount').get(function () {
    return this.article.length;
});

userSchema.virtual('answerCount').get(function () {
    return this.answers.length;
});

userSchema.virtual('upVotingCount').get(function () {
    return this.upvotings.length;
});

userSchema.virtual('downVotingCount').get(function () {
    return this.downvotings.length;
});

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;