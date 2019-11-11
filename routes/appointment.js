
const router = require ('express').Router();
const User = require('../models/User');




const Appointment = require('../models/AppointmentModel');

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

router.post('/createAppointment/:userId' , async(req,res) =>{
   
    
    // appointmentWithUser =  User.findById(req.params.userId);
    // .populate("Appointments",User._id);

    // console.log(appointmentWithUser);
    console.log(req.params.userId);

    var appointments = new Appointment({
        time_slot: req.body.time_slot,
        date: req.body.date,
        user_id :req.params.userId
        
      });   
      appointments.save();
      res.json({appointments})
      
     
    
})

// router.route('/createAppointment/:userId').post( async function(req,res){
//   console.log('called',req.params.userId)
//  console.log('date',req.body.date)
//   // appointmentWithUser = await User.findById('5dbfe777a18f13106420d73e').populate("Appointments", User._id);
//    appointmentWithUser = await User.findById(req.params.userId).populate("Appointments", User._id);


//    console.log('appoint user',appointmentWithUser)

//    var appointments = new Appointment({
//        time_slot: req.body.time_slot,
//        date: req.body.date,
//        user_id :appointmentWithUser
       
//      });
//      appointments.save();

//      res.json({"message":"documents Saved"})
//      // Creates a new record from a submitted form
    
   
// })



module.exports = router;