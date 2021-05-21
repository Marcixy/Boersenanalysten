const mongoose = require('mongoose');

// User Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    username: String,
    shareCounter: Number,
    registerDate: {
        type: String,
        default: Date.now(),
    }
});

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;