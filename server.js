var express= require('express');
var webApp=express();
var bodyParser=require('body-parser');
var nodeMailer= require('nodemailer');
var fs= require('fs');

var transporter= nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:'lilylola8405@gmail.com',
        pass:'Lolalily8405'
    }
});

webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({extended: true}));


webApp.get('/',function(req,res){
    res.send('hello world');
});

webApp.post('/email',function(req,res){
    var postedData=req.body;
    transporter.sendMail({
        from:'lilylola8405@gmail.com',
        to: postedData.to,
        subject:'this is a test',
        html:postedData.msg
    },
    function(err,info){
        if(err){
            console.log(JSON.stringify(err));
            return res.sendStatus(500);
        }
        console.log(JSON.stringify(info));
        res.json(info);
    });
});
webApp.post('/emailresume',function(req,res){
    fs.readFile('./resume.html', 'utf8', function(err,contents){
        if(err){
            console.log(JSON.stringify(err));
            res.sendStatus(500);
            return;
        }
        res.end(contents);
    });

})
webApp.listen(8987);
console.log('server listening');
