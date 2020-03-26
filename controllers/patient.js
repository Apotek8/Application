const {Patient, Medicine, Order} = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                data.password = hash;
                console.log(data)
                Patient.create(data)
                .then(() => res.redirect("/patient/login"))
                .catch(err => res.send(err));
            });
        });
    }

    static formLogin(req, res)
    {
        req.app.locals.as = "patient";
        res.render("./patient/login");
    }

    static login(req, res)
    {
        let {username, password} = req.body;
        Patient.findOne({where : {username}})
        .then((data) =>
        {
            if(bcrypt.compareSync(password, data.password))
            {
                req.session.username = data.id;
                req.session.isLogin = true;
                res.redirect("/patient");
            }
            else
                res.redirect("/patient/login");
        })
        .catch(err => res.redirect("/patient/login"));
    }
    
    static showMedicine(req, res)
    {
        Medicine.findAll()
        .then(data => res.render("./patient/buy", {data}))
        .catch(err => res.send(err));
    }

    static createOrder(req, res)
    {
        let {MedicineId, amount} = req.body;
        let data = 
        {
            MedicineId, 
            amount,
            PatientId : req.session.username,
            date : new Date()
        }
        Order.create(data)
        .then(() => res.redirect("/patient"))
        // .then(data => res.send(data))
        .catch(err => res.send(err));
    }

    static showOrder(req, res)
    {
        let PatientId = req.session.username;
        
        Order.findAll({where : {PatientId}, include : [Patient, Medicine]})
        .then(data => res.render("./patient/order", {data}))
        .catch(err =>  res.send(err));
    }

    static logout(req, res)
    {
        req.session.isLogin = false;
        req.session.username = 0;
        res.redirect("/patient/login")
    }
}

module.exports = PatientController;