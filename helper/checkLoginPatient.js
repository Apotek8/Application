function checkLogin(req, res, next)
{
    if(req.session.isLogin)
        next();
    else
        res.redirect("/patient/login");
}

module.exports = checkLogin;