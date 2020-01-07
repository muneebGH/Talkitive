var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");
var welcome = express();
welcome.use(
  express.static(__dirname.substring(0, __dirname.length - 6) + "/ui")
);

welcome.use(bodyParser.json());
welcome.use(bodyParser.urlencoded({ extended: false }));
welcome.listen(3301, () => {
  console.log("something happened");
  console.log(__dirname.length);
});

welcome.get("/", (req, res) => {
  res.sendFile(path.resolve("../ui/screens/login_screen.html"));
});

welcome.post("/adduser", (req, res) => {
  console.log(req.body);
});
