var express = require("express");
var path = require("path");
var port = process.env.PORT || 3000;
var app = express();
app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.get('/corona', function(req, res) {
  const pathy = path.join(__dirname, '/ch.mp4')
  const stat = fs.statSync(pathy)
  const fileSize = stat.size
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  }
  res.writeHead(200, head)
  fs.createReadStream(pathy).pipe(res)
});
app.use(function(req, res, next){
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
});
app.listen(port, function () {});