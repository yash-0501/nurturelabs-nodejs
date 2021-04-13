const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token) res.status(400).send('Not authenticated')

    try{
        const verified = jwt.verify(token,  process.env.secret);
        req.user=verified;
        next();
    } catch(err){
        res.status(400).send('Invalid Token');
    }
}

