const router = require("express").Router();
const Speciality = require("../models/Speciality");

// get  by specialit

router.get("/specialityDetails/:disease", async (req, res) => {
  //console.log(req.body);
  try {
    const speciality = await Speciality.findOne({
      disease: req.params.disease
    });
    console.log(speciality.name);
    res.json(speciality.name);
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.post("/specialityregister", async (req, res) => {
  const speciality = new Speciality({
    name: req.body.name
  });
  try {
    const specialityuser = await speciality.save();
    res.send(speciality);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
