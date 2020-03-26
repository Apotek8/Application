const {Admin, Patient, Medicine, Order} = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AdminController
{
    static formAdd(req, res)
    {
        res.render("./Admin/add");
    }

    static add(req, res)
    {
        // res.send(req.body)
        let {name, username, password, address, email, phone} = req.body;
        let data = {name, username, password, address, email, phone};
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                // Store hash in your password DB.
                data.password = hash;
                console.log(data)
            });
        });
        console.log(data)
        Admin.removeAttribute("id");
        Admin.create(data)
        .then(() => res.redirect("/admin/login"))
        // .then(data => res.send(data))
        .catch(err => res.send(err));
    }

    static formLogin(req, res)
    {
        req.app.locals.as = "admin";
        req.session.isLogin = false;
        res.render("./admin/login");
    }

    static login(req, res)
    {
        let {username, password} = req.query;
        Admin.findByPk(username)
        .then((data) =>
        {
            bcrypt.compare(password, data.password, function(err, result) {
                req.session.isLogin = true;
                res.redirect("/admin")
                // result == true
            });
        })
        .catch(err => res.send(err));
    }
    static showProfile(req, res)
    {
        const {username,  password} = req.session;
        escape.send(req.session)
    }
}

module.exports = AdminController;