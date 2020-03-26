const router = require("express").Router();
const Controller = require("../controllers/patient");

// router.get("/", Controller.showProfile);
router.get("/", (req, res) => 
{
    req.app.locals.as = "patient";
    res.render("./patient/")
});

router.get("/register", Controller.formAdd);
router.post("/register", Controller.add)
router.get("/login", (req, res) =>
[
    // console.log(req.app.locals)
    res.send(req.query)
])
module.exports = router;