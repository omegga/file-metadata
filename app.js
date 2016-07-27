var express = require('express'),
	multer  = require('multer'),
	jade    = require('jade'),
	path    = require('path'),
	port    = process.env.PORT || 8080;

var app = express();

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "jade");

var upload = multer();

app.get("/", function(req, res) {
	var formAction = req.protocol+"://"+req.get("host")+"/upload";
	res.render("index", {
		formAction: formAction
	});
});

app.post('/upload', upload.single('uploadedFile'),  function(req, res) {
	var jsonResponse = {
		"file name": req.file.originalname,
		"file size in bytes": req.file.size
	};
	
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(jsonResponse));
	
});

app.listen(port, function(req, res) {
	console.log("server is listening on port " + port);
});