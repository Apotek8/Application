const router = require("express").Router();
const Controller = require("../controllers/admin");

router.get("/", (req, res, next) => 
{
    if(req.session.isLogin)
        res.render("./admin")
    else
        res.redirect("/admin/login");
});
router.get("/register", (req, res, next) => 
{
    if(req.session.isLogin)
        next();
    else
        res.redirect("/admin");
}, Controller.formAdd);
router.post("/register", Controller.add);
router.get("/login", Controller.formLogin);
router.post("/login", Controller.login);
router.get("/order", (req, res, next) => 
{
    if(req.session.isLogin)
        next();
    else
        res.redirect("/admin");
}, Controller.showOrder);
router.post("/update", Controller.update);
router.get("/logout", Controller.logout);

module.exports = router;