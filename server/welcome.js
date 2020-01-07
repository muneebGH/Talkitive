var express = require("express");
var path = require("path");
var welcome = express();
welcome.use(
  express.static(__dirname.substring(0, __dirname.length - 6) + "/ui")
);
welcome.listen(3301, () => {
  console.log("something happened");
  console.log(__dirname.length);
});

welcome.get("/", (req, res) => {
  res.sendFile(path.resolve("../ui/screens/login_screen.html"));
});
