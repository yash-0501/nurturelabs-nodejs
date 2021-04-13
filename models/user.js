const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("User",userSchema)