const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  time_slot: {
    type: String
  },
  date: {
    type: Date
  },
  user_id: {
    type: String
  }
});
module.exports = mongoose.model("Appointments", AppointmentSchema);
