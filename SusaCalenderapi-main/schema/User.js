const mongoose = require('mongoose');


let UserSchemas = mongoose.Schema({

    userName: {
        type : String,
        required : false 
    },
    password : {
        type : String,
        required : false 
    },
    isVerified :{
        type : Boolean,
        required : false 
    },
    email : {
        type : String,
        required : false    }
   
});

module.exports = UserSchemas = mongoose.model('users',UserSchemas);