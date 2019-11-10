
const router = require ('express').Router();
const User = require('../models/User');




const Appointment = require('../models/AppointmentModel');



router.post('/createAppointment/:userId' , async(req,res) =>{

    appointmentWithUser = await User.findById(req.params.userId).populate("Appointments", User._id);

    var appointments = new Appointment({
        time_slot: req.body.time_slot,
        date: req.body.date,
        user_id :appointmentWithUser
        
      });
      appointments.save();
      // Creates a new record from a submitted form
     
    
})

module.exports = router;