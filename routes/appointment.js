
const router = require ('express').Router();
const User = require('../models/User');




const Appointment = require('../models/AppointmentModel');
const Doctor  = require('../models/DoctorDetails');

// get all appointments
router.get('/appointmentDetails' , async (req,res) => {
    //console.log(req.body);
    try{
        const appointment =  await Appointment.find();
        if(appointment == 0){
            return res.json({message : 'No appointments are registered'})
        }else{
            res.json(appointment);
        }
       
    }catch(err){
        res.status(401).json({message: err});

    }

})
// get specific appointments
router.get('/:userId' , async (req,res) => {
 // console.log(req.body);
  try{
    console.log(req.params)
    const user = await User.findById(req.params.userId);
    console.log(user);
    const uservalue = user._id;
    console.log(uservalue);
    const appointment =  await Appointment.find(user_id);
    //const value = appointment;
    console.log(appointment);
    if (uservalue === appointment){     
         console.log("Apoointments details");      
          return res.json({message : appointment})  
          
    }
          else{
          res.json({message : ' appointments not registered '});
    }
  }     
  catch(err){
      res.status(401).json({message: err});
  }

})

router.post('/createAppointment/:userId/:doctorId' , async(req,res) =>{
   
    
    // appointmentWithUser =  await User.findById(User._id);
    // .populate("Appointments",User._id);
   // doctorIdvalue =  await Doctor.findById(Doctor._id);
    //console.log(doctorIdvalue);
   
    //console.log(appointmentWithUser);
    //console.log(req.params.userId);

    var appointments = new Appointment({
        time_slot: req.body.time_slot,
        date: req.body.date,
        user_id :req.params.userId,
        doctor_id : req.params.doctorId
        
      });   
      appointments.save();
      res.json({appointments})
      
     
    
})





module.exports = router;