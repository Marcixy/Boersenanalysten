const mongoose = require('mongoose');

// Answer Schema
const Schema = mongoose.Schema;
const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Answer content must exist'],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Answer creator must exist'],
    },
    voting: {
        type: Number,
        required: [true, 'Answer voting must exist'],
    },
    created: {
        type: Date,
        required: [true, 'Answer creation date must exist'],
        default: Date.now(),
    }
});

// Model
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;