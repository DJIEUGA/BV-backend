const mongoose = require('mongoose');

const User = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    password: String,
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Active'
    },
    confirmationCode: {
        type: String,
        default: null
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
    ]
}, {timestamp: true})

module.exports = mongoose.model("User", User);