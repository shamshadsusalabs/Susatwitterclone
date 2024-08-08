const mongoose = require('mongoose');

let KanbanSchemas = mongoose.Schema({

    name: {
        type : String,
        required : false 
    },
    statusId: {
        type : Number,
        required : false 
    },
    index: {
        type : Number,
        required : false 
    },
    title: {
        type : String,
        required : false 
    },
    description: {
        type : String,
        required : false 
    },
    imageURL: {
        type : String,
        required : false 
    },
    priority: {
        type : String,
        required : false 
    },
    modifiedDate: {
        type : String,
        required : false 
    },
    closingDate: {
        type : String,
        required : false 
    },
    creationDate: {
        type : String,
        required : false 
    },
    progressDate: {
        type : String,
        required : false 
    },
    ticketId: {
        type : Number,
        required : false 
    }
    
   
});

module.exports = KanbanSchemas = mongoose.model('kanbans',KanbanSchemas);