
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
// get specific appointments of user
router.get('/user/:userId' , async (req,res) => {

  // const doctor = await Doctor.findById(req.params.doctorId);
  // console.log('doctor',doctor);

  // const doctorId = doctor._id;
  // console.log(doctorId)

  // const user = await User.findById(req.params.userId);
  // console.log('user',user);
  // const doctorId = doctor._id;
  // console.log(doctorId)

 // console.log(req.body);
  try{
    console.log('user_id',req.params.userId)
     const user = await User.findById(req.params.userId);
     console.log('user',user);
     const uservalue = user._id;
     console.log('user_value',uservalue);
     const appointment =  await Appointment.findOne({user_id:uservalue}); // retrievees specific appointment of the user
     
     //const value = appointment;
     console.log('appointments',appointment);
     res.json({appointment});
  }     
  catch(err){
      res.status(401).json({message: err});
  }

})
// get specific appointments of doctor
router.get('/doctor/:doctorId' , async (req,res) => {
  // console.log(req.body);
   try{
     console.log('doctor_id',req.params.doctorId)
      const doctor = await Doctor.findById(req.params.doctorId);
      console.log('doctor',doctor);
      const doctorvalue = doctor._id;
      console.log('doctor_value',doctorvalue);
      const appointment =  await Appointment.findOne({doctor_id:doctorvalue}); // retrievees specific appointment of the user
      
      //const value = appointment;
      console.log('appointments',appointment);
      res.json({appointment});
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