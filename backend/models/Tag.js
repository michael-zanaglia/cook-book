const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        lowercase: true
    },
    hidden: {
        type: Number
    }
})

module.exports = mongoose.model('Tag', tagSchema);