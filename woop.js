require("dotenv").config();
var express = require("express");
var path = require("path");
var mongodb = require("mongodb").MongoClient;
var port = process.env.PORT || 3000;
var app = express();
var constring = process.env.MONGO_URL;

app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.get('/corona', function(req, res) {
  res.sendFile(path.join(__dirname, '/corona.html'));
});
app.get("/api/v2/:mode-:type", function (req, res) {
 var collecta = [];
 if(req.params.mode == "RKS" && req.params.type.split('.')[0] == "high" || req.params.mode == "RKS" && req.params.type.split('.')[0] == "low"){
	mongodb.connect(constring, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("kneesocks");
      dbo.collection("imgs").find({ "type": req.params.type.split('.')[0] }).forEach(function(row) {
        var getdad = {};
        getdad["data"] = row.imgdata;
        getdad["type"] = row.type;
        collecta.push(getdad);
        db.close();
      }, done);
    });
 }else if(req.params.mode == "RKS" && !req.params.type){
	 mongodb.connect(constring, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("kneesocks");
      dbo.collection("imgs").find({}).forEach(function(row) {
        var getdad = {};
        getdad["data"] = row.imgdata;
        getdad["type"] = row.type;
        collecta.push(getdad);
        db.close();
      }, done);
    });
 }else {
	res.send("Invalid Arguments");
 }
 function done(err){
	if(collecta.length == 0){res.send("Invalid Arguments");};
	var tab = "";
	if(req.params.mode == "RKS"){
	  tab = collecta[collecta.length * Math.random() | 0];
	};
	if(req.params.type.split('.')[1] == "json"){
	  res.json(tab);
	}else {
	  var img = Buffer.from(tab.data.split(',')[1], 'base64');
	  res.end(img);
	}
 };
});
app.use(function(req, res, next){
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
});
app.listen(port, function () {});