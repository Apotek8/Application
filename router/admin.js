const router = require("express").Router();
const Controller = require("../controllers/admin");

router.get("/", (req, res, next) => 
{
    if(req.session.isLogin)
        res.render("./admin/");
    else
        res.redirect("/admin/login");
});
router.get("/register", Controller.formAdd);
router.post("/register", Controller.add);
router.get("/login", Controller.formLogin);
router.post("/login", Controller.add);

module.exports = router;