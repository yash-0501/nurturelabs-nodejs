const express   = require('express');
const path      = require('path');
const mongoose  = require('mongoose');
const dotenv    = require('dotenv');
const app = express();
const authRoutes = require("./routes/auth");
const advisorRoustes = require("./routes/advisors");
const adminRoutes = require("./routes/admin");
dotenv.config()

mongoose.connect(process.env.db_connect,
{ useNewUrlParser:true},
()=>console.log("connected to db"))

app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/user', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user/:id/advisor', advisorRoustes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started")
});