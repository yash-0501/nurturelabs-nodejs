const router = require('express').Router({mergeParams: true});;
const verify = require('./verifyToken');
const Advisor = require("../models/advisors");
const User = require("../models/user");
const Booking = require("../models/bookings");
const user = require('../models/user');



router.get('/',verify,(req,res)=>{
    console.log(req.params.id)
    if(req.user._id==req.params.id){
    Advisor.find({}, (err,advisors)=>{
        var map = []
       if(err) return res.status(400).send(err)
       else{
        advisors.forEach((advisor)=>{
            map.push(advisor)
        })
        res.send(map);
       }
    })
} else return res.status(400).send("Invalid Request")
})

router.post('/:advisor_id', verify, async function(req,res){
    
    var myDate = new Date(req.body.booking_time);
    console.log(myDate)
    if(req.user._id==req.params.id){
    var advisor = await Advisor.findById(req.params.advisor_id)
    var user = req.user
    var booking = new Booking ({
        user: user,
        advisor:advisor,
        booking_time: myDate
    })

    try{
        const savedBooking = await booking.save();
        res.status(200).send({user_booking: savedBooking});
    }   catch(err){
        res.status(400).send(err);
    }

    } else return res.status(400).send("Invalid Request")

})


router.get("/booking", verify, async function(req,res){
    var map = []
    if(req.user._id==req.params.id){
        Booking.find()
            .select('booking_time _id')
            .populate('advisor')
            .exec()
            .then(bookings => {
                res.status(200).send(
                    {booking: bookings.map(booking=>{
                        return{
                            booking_id:booking._id,
                            advisor:booking.advisor,
                            booking_time:booking.booking_time
                        }
                    })}
                )
            })
        
    } else return res.status(400).send("Invalid Request")
    
})

module.exports = router;