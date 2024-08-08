const express_ = require('express');
const app = express_();
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");
const xss  = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
var cors = require('cors');
const bodyParser = require("body-parser")
const uri = "mongodb+srv://susalabs:susalabs@cluster0.mnsuewf.mongodb.net/SusaCalender";

const session = require('express-session');
const passport = require('passport');

require("dotenv").config();


const connectToDatabase = async () => {
    try{
        await mongoose.connect(uri,{
                useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("MongoDB is connected");
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}
connectToDatabase();
const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 500,
    message:
    "Too many accounts created from this IP, please try again after 15 min"
});

app.use(session({
    secret: 'dhfsjfljsdfljks35353', // Change this to a secure secret for production
    resave: false,
    saveUninitialized: false
  }));
  
  
  app.use(passport.initialize());
  app.use(passport.session()); 

app.use(apiLimiter);//safety against DOS attack
app.use(cors());//to follow cors policy
app.use(xss());//safety against XSS attack or Cross Site Scripting attacks
app.use(helmet());//safety against XSS attack
app.use(express_.json({ extended: false }));
app.use(express_.static('.'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/event',require('./api/events'));
app.use('/api/schedule',require('./api/schedule'));
app.use('/api/shared',require('./api/shared'));
app.use('/api/user',require('./api/user'));
app.use('/api/kanban',require('./api/kanbans'));
app.use('/api/kanbandata',require('./api/kanbandata'));
app.use('/api/themes',require('./api/themes'));
app.use('/api/standups',require('./api/standup'));
app.use('/api/upload',require('./api/upload'));
app.use('/auth', require('./api/auth'))
app.use('/api/CurrentUser', require('./api/CurrentUser'))

const port = process.env.PORT || 3000;
app.get('/',(req,res) =>{

    console.log(port)
    res.json('working')
})
app.listen(port,() => console.log(`Server is up and running at ${port}`));