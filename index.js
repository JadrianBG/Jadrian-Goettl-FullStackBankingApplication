var express = require('express');
var app = express();
var cors = require('cors');
var dal     = require('./dal.js');
const e = require('express');

app.use(express.static('public'));
app.use(cors());

app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.find(req.params.email).
        then((users) => {
            if(users.length > 0){
                console.log(user);
                res.send(user);    
            }
            else{
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }
        });
});

 
app.get('/account/login/:email/:password', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
        console.log("index file");
        console.log(user);
           if(user.length > 0){
                if (user.password === req.params.password){
                    res.send(user);
                }
            }
    }); 
});

app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);
