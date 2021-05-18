const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    email: String,
    registerDate: {
        type: String,
        default: Date.now(),
    }
});

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;