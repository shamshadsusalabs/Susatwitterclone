const mongoose = require('mongoose');


let CurrentUser = mongoose.Schema({

    
    email : {
        type : String,
        required : false    }
   
});

module.exports = CurrentUser = mongoose.model('CurrentUser',CurrentUser);