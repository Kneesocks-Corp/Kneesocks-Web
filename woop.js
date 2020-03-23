var express = require("express");
var path = require("path");
var port = process.env.PORT || 3000;
var app = express();
app.use(app.router);
app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use(function(req, res, next){
  res.status(404);
  res.sendFile(path.join(__dirname, '/404.html'));
});
app.listen(port, function () {});