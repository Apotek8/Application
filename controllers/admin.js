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
        let {name, username, password, address, email, phone} = req.body;
        let data = {name, username, password, address, email, phone};
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                data.password = hash;
                console.log(data)
                Admin.create(data)
                .then(() => res.redirect("/admin"))
                .catch(err => res.send(err));
            });
        });
        
    }

    static formLogin(req, res)
    {
        req.app.locals.as = "admin";
        res.render("./admin/login");
    }

    static login(req, res)
    {
        let {username, password} = req.body;
        Admin.findOne({where : {username}})
        .then((data) =>
        {
            if(bcrypt.compareSync(password, data.password))
            {
                req.session.username = data.id;
                req.session.isLogin = true;
                res.redirect("/admin");
            }
            else
                res.redirect("/admin/login");
        })
        .catch(err => res.redirect("/admin/login"));
    }

    static showOrder(req, res)
    {
        Order.findAll({include : [Patient, Medicine]})
        .then(data => res.render("./admin/order", {data}))
        .catch(err => res.send(err))
    }  

    static update(req, res)
    {
        let {information} = req.body;
        let {id} = req.params;
        Order.update({information}, {where : {id}})
        .then(() => res.redirect("/admin/order"))
        .catch(err => res.send(err))
    }

    static logout(req, res)
    {
        req.session.isLogin = false;
        req.session.username = 0;
        res.redirect("/admin/login")
    }
}

module.exports = AdminController;