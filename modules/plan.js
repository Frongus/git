const fs = require('fs');

var filePath = './data/save.txt';
var filePath2 = './data/date.txt';

fs.readFile(filePath, 'utf-8', (err, resdata) => {
    if(err) {
        console.log(err);
    }
    else {
        var ResPlanData = JSON.parse(resdata);
        data = ResPlanData;
    }
});

fs.readFile(filePath2, 'utf-8', (err, resdate) => {
    if(err) {
        console.log(err);
    }
    else {
        var ResPlanDate = resdate;
        date = ResPlanDate;
    }
});

const TestData =
        [
            {"Stunde":"test1", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
            {"Stunde":"test2", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
            {"Stunde":"test3", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
            {"Stunde":"test4", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
            {"Stunde":"test5", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
            {"Stunde":"test6", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
            {"Stunde":"test7", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
            {"Stunde":"test8", "Klasse":"test4930", "Lehrer":"test4930", "Vertretung":"test4930"},
        ]
const TestDate = '25.12.2022 | Montag/Monday';

var data = []
var date = ''

module.exports = {
    get: function() {
         return data;
    },

    getDate: function() {
        return date;
    },
    editPlan: function(Lehrer, Klasse, Stunde, Vertretung) {
        console.log(Lehrer, Klasse, Stunde, Vertretung);
        data.push({"Stunde":Stunde, "Klasse":Klasse, "Lehrer":Lehrer, "Vertretung":Vertretung},);
    },
    emptyPlan: function() {
        data = [];
    },
    setDate: function(data) {
        date = data
    },
    savePlan: function() {
        var reqdata = JSON.stringify(data);
        fs.writeFile(filePath, reqdata, (err) => {
            if(err) {
                console.log(err)
            }
            else {
                return 'ok00'
            }
        });

        fs.writeFile(filePath2, date, (err) => {
            if(err) {
                console.log(err)
            }
            else {
                return 'ok00'
            }
        });
    }
}