const mongoose = require("mongoose");

const SpecialitySchema = new mongoose.Schema({
  name: {
    type: String
  },

  disease: {
    type: Array
  }
});
module.exports = mongoose.model("Speciality", SpecialitySchema);
