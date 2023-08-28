const mongoose = require("mongoose");

const Container = new mongoose.Schema({
    containerId: String,
    sealedNumber: String,
    imageUrls: [
        {
            type: String
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("Container",Container);