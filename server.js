var express = require('express');
var webApp = express();
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var fs = require('fs');
var cors = require('cors');

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lilylola8405@gmail.com',
        pass: 'Lolalily8405'
    }
});
webApp.use(cors());
webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({
    extended: true
}));


webApp.get('/', function(req, res) {
    res.send('hello world');
});

webApp.post('/email', function(req, res) {
    var postedData = req.body;
    transporter.sendMail({
            from: 'lilylola8405@gmail.com',
            to: postedData.to,
            subject: 'this is a test',
            html: postedData.msg
        },
        function(err, info) {
            if (err) {
                console.log(JSON.stringify(err));
                return res.sendStatus(500);
            }
            console.log(JSON.stringify(info));
            res.json(info);
        });
});
webApp.post('/emailresume', function(req, res) {
    if(!req.body || !req.body.destination_email){
        console.log("received bad request");
        res.sendStatus(400);
        return;
    }
    fs.readFile('./resume.html', 'utf8', function(err, contents) {
        if (err) {
            console.log(JSON.stringify(err));
            res.sendStatus(500);
            return;
        }
        transporter.sendMail({
                to: req.body.destination_email,
                subject: 'this is a test',
                html: contents
            },
            function(err, info) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return res.sendStatus(500);
                }
                console.log(JSON.stringify(info));
                res.json(info);
                
            });
    });

})
webApp.get('/resume_emailer', function(req, res) {
    fs.readFile('./resume-emailer.html', 'utf8', function(err, contents) {
        if (err) {
            console.log(JSON.stringify(err));
            res.send(contents);

        }
        res.end(contents);
    });
});
webApp.listen(8987);
console.log('server listening');
