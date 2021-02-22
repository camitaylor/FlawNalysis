const mongoose = require('mongoose');

// instantiate object Schema
let Ticket = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ticketDetails: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    priority: {
        type: String
    },
    assignedTo: {
        type: String
    },
    status: {
        type: String
    },
    date:{
        type: Date
    },
    email:{
        type: String
    }

});


// allows to require this file
module.exports = mongoose.model('Ticket', Ticket);  // ( Mongoose identifier, Object Schema)