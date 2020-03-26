const router = require("express").Router();
const admin = require("./admin");
const patient = require("./patient");

router.get("/", (req, res) => res.render("index"));
router.use("/admin", admin);
router.use("/patient", patient);

module.exports = router;