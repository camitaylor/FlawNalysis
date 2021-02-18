const mongoose = require('mongoose');

// instantiate object Schema
let Ticket = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    ticketDetails: {
        type: String,
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
    }
});


// allows to require this file
module.exports = mongoose.model('Ticket', Ticket);  // ( Mongoose identifier, Object Schema)