var express = require('express');
var bodyParser = require('body-parser');


var db = require ('./data/stud.json');

var app = express();


app.use(bodyParser.urlencoded());

app.use( function (req, res, next){
    console.log(db[0]);
    console.log(req.body);
    next();
})

app.get('/places', function(req,res){
    db.collection('cities').find().toArray(function(err,result){
        res.json(result);
        })
        
})



app.listen("3000");
