const mongoose = require('mongoose');

// Tag Schema
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    tagname: {
        type: String,
        required: [true, 'Tag name must exist'],
    },
    description: {
        type: String,
        required: [true, 'Tag description must exist'],
    },
    articleCounter: {
        type: Number,
        default: 0,
        required: [true, "Article counter must exist"],
        min: [0, 'Article counter must greater or equal 0'],
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Tag CreatorId must exist"],
    },
    status: {
        type: String,
        required: [true, "Tag status must exist"],
    }
},
{
    timestamps: true
});

// Model
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;