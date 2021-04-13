const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    advisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advisor'
    },
    booking_time:{
        type:Date,
    }
})

module.exports = mongoose.model("Booking",bookingSchema)