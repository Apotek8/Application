const {Patient} = require("../models");

class PatientController
{
    static formAdd(req, res)
    {
        res.render("./patient/add");
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

module.exports = PatientController;