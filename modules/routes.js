const express = require('express');
const router = express.Router();
const Plan = require('./plan.js');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const plan = require('./plan.js');

var SecureLink;

var locStunde = [];
var locLehrer = [];
var locKlasse = [];
var locVertretung = [];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    res.render('index.hbs');
})

router.get('/data/', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    var data = JSON.stringify(Plan.get());
    res.json(`${data}`);
});

router.get('/data/date/', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    var data = Plan.getDate();
    res.json(`${data}`);
});

router.get('/login/', (req,res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    res.render('login.hbs');
});

router.post('/login/check/admin/', (req,res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    var data = req.body;

    if(data.Pass == config.ADMINPASSWORT) {
        if(data.User == config.ADMINUSERNAME) {
            SecureLink = uuid.v4();
            console.log(SecureLink);
            res.json(`[{"${SecureLink}"}]`);
        }
        else {
            res.json(`[{"err002"}]`);
        }
    }
    else {
        res.json(`[{"err002"}]`);
    }
});

router.get(`/admin/:id`, (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    if(req.params.id == SecureLink)
    {
        res.render('admin.hbs');
    }
    else {
        res.render('err.hbs');
    }
})

router.post('/data/submit/:id', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);

    var data = req.body;
    
    Plan.emptyPlan();

    if(req.params.id == "Stunde")
    {
        locStunde = [];
        res.json(`[{ok00}]`)
        data.HourArr.forEach(element => {
            locStunde.push(element);
        });
    }
    else if(req.params.id == "Klasse")
    {
        locKlasse = [];
        res.json(`[{ok00}]`)
        data.ClassArr.forEach(element2 => {
            locKlasse.push(element2);
        });
    }
    else if(req.params.id == "Lehrer")
    {
        locLehrer = [];
        res.json(`[{ok00}]`)
        data.TeacherArr.forEach(element3 => {
            locLehrer.push(element3);
        });
    }
    else if(req.params.id == "Vertretung")
    {
        locVertretung = [];
        res.json(`[{ok00}]`)
        data.ReplacementArr.forEach(element4 => {
            locVertretung.push(element4);
        });
    }
    else {
        res.render('err.hbs')
    }
});

router.get('/data/process/', (req,res) => {

    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    var lenght = locStunde.length;
    
    for(var i = 0; i < lenght; i++)
    {
        var data1 = locLehrer[i];
        var data2 = locKlasse[i];
        var data3 = locKlasse[i];
        var data4 = locVertretung[i];
        Plan.editPlan(data1, data2, data3, data4);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;
    Plan.setDate(today);

    res.json('[{ok00}]')
})

router.get('/data/save/', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    Plan.savePlan();
    res.json(`[{ok00}]`);
});

router.get('/data/get/old/', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    var data = JSON.stringify(Plan.get());
    res.json(data);
});

router.get('/data/clear/', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    plan.emptyPlan();
    res.json(`[{ok00}]`);
});

module.exports = router