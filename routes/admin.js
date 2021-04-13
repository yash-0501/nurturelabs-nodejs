const router = require('express').Router({mergeParams: true});;
const verify = require('./verifyToken');
const Advisor = require("../models/advisors");
const User = require("../models/user");
const { advisorValidation } = require('../validation');


router.post('/advisor', verify, async  (req,res)=>{
    const user = await User.findOne({_id:req.user._id});
    if(user.isAdmin) {
    const {error} = advisorValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const advisor = new Advisor({
        name:req.body.name,
        profile_pic:req.body.profile_pic
    })
    try{
        advisor.save();
        res.sendStatus(200);
    }catch(err){
        res.status(400).send(err);
    } 
}
else res.status(400).send("Access Denied")
} )

module.exports = router;