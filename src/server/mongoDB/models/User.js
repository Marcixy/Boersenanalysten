const mongoose = require('mongoose');

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
    description: {
        type: String,
        default: "",
    }
},
{
    timestamps: true
});

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;