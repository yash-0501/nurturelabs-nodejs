const mongoose = require('mongoose');

const advisorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    profile_pic:{
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model("Advisor",advisorSchema)