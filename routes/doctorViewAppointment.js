
const router = require ('express').Router();
const User = require('../models/User');




const Appointment = require('../models/AppointmentModel');
const Doctor  = require('../models/DoctorDetails');

// get specific appointments of doctor
router.get('/doctors/:doctorId' , async (req,res) => {
    // console.log(req.body);
     try{
       console.log('doctor_id',req.params.doctorId)

        const doctor = await Doctor.findById(req.params.doctorId);
        console.log('doctor',doctor);

        const doctorvalue = doctor._id;
        console.log('doctor_value',doctorvalue);

        const appointment =  await Appointment.findOne({doctor_id:doctorvalue}); // retrievees specific appointment of the user
        console.log(appointment.date);
        
        //const value = appointment;

        console.log('appointments',appointment);
        
        res.json({appointment});
     }     
     catch(err){
         res.status(401).json({message: err});
     }
   
   })
   

 module.exports = router;