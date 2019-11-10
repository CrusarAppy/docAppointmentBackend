const router = require("express").Router();
const User = require("../models/User");

const Appointment = require("../models/AppointmentModel");

router.post("/createAppointment/:userId", async (req, res) => {
  const {
    params: { userId }
  } = req;
  const user = await User.findById(userId);
  if (!Object.keys(user).length > 0)
    return res.send({ message: "User not found " });
  const newAppointment = new Appointment({
    time_slot: req.body.time_slot,
    date: req.body.date,
    user_id: userId
  });
  const appointment = await newAppointment.save();
  return res.json({
    userInfo: user,
    appointment: appointment
  });
  // Creates a new record from a submitted form
});

module.exports = router;
