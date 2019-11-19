const router = require("express").Router();
const Doctor = require("../models/DoctorDetails");

router.post("/register", async (req, res) => {
  const doctor = new Doctor({
    Fullname: req.body.Fullname,
    Username: req.body.Username,
    Address: req.body.Address,
    PhoneNumber: req.body.PhoneNumber,
    Email: req.body.Email,
    Password: req.body.Password,
    Specialization: req.body.Specialization,
    Type: "Doctor"
  });
  try {
    const savedUser = await doctor.save();
    res.send({ doctor: doctor._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all doctors
router.get("/doctorDetails", async (req, res) => {
  //console.log(req.body);
  try {
    //var noMatch = null;
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search));
      console.log(regex);
      // const searchValue = req.query.search;
      // console.log(searchValue);

      const doctor = await Doctor.find({ Username: regex });

      console.log(doctor);

      if (doctor == null) {
        return res.json({ message: "No such Doctor is registered" });
      } else {
        //console.log(doctor._id);
        res.json(doctor);
      }
    } else {
      const doctor = await Doctor.find();
      res.json(doctor);
      console.log(doctor);
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

// get doctors by speciality
router.get("/doctorSpeciality/:speciality", async (req, res) => {
  //console.log(req.body);
  try {
    const doctor = await Doctor.find({ Specialization: req.params.speciality });
    console.log(doctor);
    res.json({ doctor });
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  // checking if the doctor is in the database

  const doctor = await Doctor.findOne({ Email: req.body.Email });
  if (!doctor) return res.status(400).send("Email is not found");

  //password is correct
  if (req.body.Password != doctor.Password)
    //const validPass = await compare(req.body.Password,doctor.Password);
    // if(!validPass)
    return res.status(400).send("Invalid password");

  //specific doctors
  router.get("/:doctorId", async (req, res) => {
    //console.log(req.params.postId);
    try {
      const doctor = await Doctor.findById(req.params.doctorId);
      res.json(doctor);
    } catch (err) {
      res.json({ message: err });
    }
  });
  console.log(doctor);
  //create and assign a token
  //const token = jwt.sign({_id : user._id ,Type :user.Type}, process.env.TOKEN_SECRET);
  const doctorinfo = {
    _id: doctor._id,
    Type: doctor.Type
  };
  // res.header('auth-token', token).send(token);
  res.send(doctorinfo);
  // return(res.send('logged in!'));
});

//delete post

router.delete("/:doctorId", async (req, res) => {
  //console.log(req.params.postId);
  try {
    const removeDoctor = await Doctor.findByIdAndDelete({
      _id: req.params.doctorId
    });
    res.json(removeUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:doctorId", async (req, res) => {
  //console.log(req.params.postId);
  try {
    const updateDoctor = await Doctor.updateOne(
      { _id: req.params.userId },
      { $set: { Fullname: req.body.Fullname } }
    );
    res.json(updateDoctor);
  } catch (err) {
    res.json({ message: err });
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
