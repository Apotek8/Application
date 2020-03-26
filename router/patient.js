const router = require("express").Router();
const Controller = require("../controllers/patient");

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
router.get("/order", (req, res, next) => 
{
    if(req.session.isLogin)
        next();
    else
        res.redirect("/patient/login");
},
    Controller.showMedicine);
router.post("/order", Controller.createOrder);
router.get("/history", (req, res, next) => 
{
    if(req.session.isLogin)
        next();
    else
        res.redirect("/patient/login");
},
    Controller.showOrder);
router.get("/logout", Controller.logout)
module.exports = router;