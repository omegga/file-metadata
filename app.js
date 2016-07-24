var express = require('express'),
	multer  = require('multer'),
	jade = require('jade'),
	path = require('path'),
	port = process.env.PORT || 8080;

var app = express();

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "jade");

var upload = multer();

app.get("/", function(req, res) {
	var formAction = req.protocol+"://"+req.get("host");
	res.render("index", {
		formAction: formAction
	});
});

app.post('/', upload.single('uploadedFile'),  function(req, res) {
	var formAction = req.protocol + "://" + req.get("host");
	var fileSize = "Size of the file is : " + req.file.size + " bytes";
	res.render("index", {
		formAction: formAction,
		fileSize: fileSize
	});
});

app.listen(port, function(req, res) {
	console.log("server is listening on port " + port);
});