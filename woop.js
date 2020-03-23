var express = require("express");
var path = require("path");
var request = require("request");
var port = process.env.PORT || 3000;
var app = express();
app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/corona', function(req, res) {
    const head = {
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    var epic = request('https://dedibox.tech/ch.mp4').pipe(fs.createWriteStream('ch.mp4'))
	epic.pipe(res);
});
app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use(function(req, res, next){
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
});
app.listen(port, function () {});