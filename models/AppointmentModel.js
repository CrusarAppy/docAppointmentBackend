const mongoose = require ('mongoose');

const AppointmentSchema = new mongoose.Schema({



    time_slot : {
        type: String
    },
    date :  {
        type:Date,
    },
    user_id : {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }

});
module.exports = mongoose.model('Appointments',AppointmentSchema );