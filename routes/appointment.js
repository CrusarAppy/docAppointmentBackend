const router = require("express").Router();
const User = require("../models/User");

const Appointment = require("../models/AppointmentModel");
const Doctor = require("../models/DoctorDetails");

// get all appointments
router.get("/appointmentDetails", async (req, res) => {
  //console.log(req.body);
  try {
    const appointment = await Appointment.find();
    if (appointment == 0) {
      return res.json({ message: "No appointments are registered" });
    } else {
      res.json(appointment);
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

// get specific appointments of user
router.get("/user/:userId", async (req, res) => {
  try {
    console.log("user_id", req.params.userId);
    const user = await User.findById(req.params.userId);
    console.log("user", user);
    const uservalue = user._id;
    console.log("user_value", uservalue);
    const appointment = await Appointment.find({
      user_id: uservalue
    });
    console.log("appointments", appointment);
    const doctorNameValue = [];
    for (const element of appointment) {
      const doctor = element.doctor_id;
      const doctorDetails = await Doctor.findById({
        _id: doctor
      });
      doctorNameValue.push([
        doctorDetails.Fullname,
        doctorDetails.Address,
        doctorDetails.PhoneNumber,
        element._id,
        element.time_slot,
        element.date
      ]);
      console.log(doctorNameValue);
    }
    res.json({
      doctorNameValue
    });
  } catch (err) {
    res.status(401).json({
      message: err
    });
  }
});

// get specific appointments of doctor
router.get("/doctor/:doctorId", async (req, res) => {
  // console.log(req.body);
  try {
    console.log("doctor_id", req.params.doctorId);
    const doctor = await Doctor.findById(req.params.doctorId);
    console.log("doctor", doctor);
    const doctorvalue = doctor._id;
    console.log("doctor_value", doctorvalue);

    const appointment = await Appointment.find({ doctor_id: doctorvalue }); // retrievees specific appointment of the user
    //const value = appointment;
    console.log("appointments", appointment);

    const userNameValue = [];
    for (const element of appointment) {
      const user = element.user_id;
      const userDetails = await User.findById({
        _id: user
      });
      console.log(userDetails);
      userNameValue.push([
        userDetails.Fullname,
        userDetails.Address,
        userDetails.PhoneNumber,
        element._id,
        element.time_slot,
        element.date
      ]);
      console.log(userNameValue);
    }
    res.json({
      userNameValue
    });
  } catch (err) {
    res.status(401).json({
      message: err
    });
  }
});

router.post("/createAppointment/:userId/:doctorId", async (req, res) => {
  var appointments = new Appointment({
    time_slot: req.body.time_slot,
    date: req.body.date,
    user_id: req.params.userId,
    doctor_id: req.params.doctorId
  });
  appointments.save();
  res.json({ appointments });
});

//delete appointments

router.delete("/:appointmentId", async (req, res) => {
  //console.log(req.params.postId);
  try {
    const removeAppointment = await Appointment.findByIdAndDelete({
      _id: req.params.appointmentId
    });

    res.send("Appointment cancelled!");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
