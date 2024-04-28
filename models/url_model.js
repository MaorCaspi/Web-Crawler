const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: { // URL address
        type: String,
        required: true,
        unique: true,
        index: true
    },
    htmlContent: { // Raw HTML content
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Url', urlSchema);