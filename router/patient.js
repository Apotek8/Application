const router = require("express").Router();
const Controller = require("../controllers/patient");
const checkLogin = require("../helper/checkLoginPatient");

router.get("/", (req, res, next) => 
{
    if(req.session.isLogin)
        res.render("./patient")
    else
        res.redirect("/patient/login");
});
router.get("/register", (req, res, next) => 
{
    if(req.session.isLogin)
        res.redirect("/patient");
    else
        next();
},
Controller.formAdd);
router.post("/register", Controller.add);
router.get("/login", Controller.formLogin);
router.post("/login", Controller.login);
router.get("/order", checkLogin, Controller.showMedicine);
router.post("/order", checkLogin, Controller.createOrder);
router.get("/history", checkLogin, Controller.showOrder);
router.get("/logout", Controller.logout);
router.get("/delete", checkLogin, Controller.delete);
module.exports = router;