const {Admin, Patient, Medicine, Order} = require("../models");

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
        Patient.create(data)
        .then(data => res.send(data))
        // .the(() => res.redirect("/patient/login"))
        .catch(err => res.send(err));
    }

    static login(req, res)
    {
        
    }

    static showProfile(req, res)
    {
        const {username,  password} = req.session;
        escape.send(req.session)
    }
}

module.exports = AdminController;