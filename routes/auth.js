const router = require('express').Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require('bcryptjs')



router.post('/register', async(req,res) =>{


    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    //check if email already exists
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).send("Email already exists")
    
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const  hashedPassword = await bcrypt.hash(req.body.password,salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.status(200).send({userid: user._id});
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', async(req,res) =>{
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if email exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email is wrong")

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Password is wrong")

    //create token
    const token = jwt.sign({_id:user._id}, process.env.secret);
    res.header('auth-token', token)

    res.status(200).send({token:token,userid:user._id})
})

module.exports = router;