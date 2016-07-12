var express = require("express");
var app = express();

function naturalize(date){
   var year = date.substring(0,4);
   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   var month = months[date.substring(5,7) - 1];
   var day = date.substring(8,10);
   return month + " " + day + ", " + year; 
}

app.get('/', function (req, res){
res.send("Please enter a date or unix timestamp into the URL");
});

app.get('/:date', function (req, res) {
  var date = req.params.date;
  
  if (date.match(/[a-z]/i)){
    if (isNaN(Date.parse(date))) {
    var json3 = {"Natural" : "null", "Unix" : "null"};
    res.send(json3);
  }
      var ISO = new Date(decodeURI(date)).toISOString();
      var natural = naturalize(ISO);
      var unix  = Date.parse(ISO);
      var json = {"Natural" : natural, "Unix" : unix};
      res.send(json);
  }
  else {
    if (new Date(Number(date)).toISOString() == "Invalid Date"){
        var json4 = {"Natural" : "null", "Unix" : "null"};
    res.send(json4);
      }
    
      var unix2 = date;
      var ISO2 = new Date(Number(date)).toISOString();
      
      var natural2  = naturalize(ISO2);
      var json2 = {"Natural" : natural2, "Unix" : unix2};
      res.send(json2);
  }
  });

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080');
});