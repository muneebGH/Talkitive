var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var userCRUD = require("./CRUD");
var loginValidation = require("./loginValidation");
var messageHandler = require("./holdMessages");

var senderId = "123";
var recieverId = "456";

userCRUD.establishConnection();

var path = require("path");
console.log(__dirname);

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3301, () => {
  console.log("something happened");
  console.log(__dirname.length);
});

io.on("connection", socket => {
  console.log("socket io successfull");
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("login_screen.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.resolve("chat_screen.html"));
});

app.get("/messages", async (req, res) => {
  var res = await messageHandler.getAllOf(senderId, recieverId);
  return res;
});

app.post("/messages", (req, res) => {
  var done = messageHandler.addMessage(req.body);
  io.emit("message", res.body);
  done ? res.sendStatus(200) : res.sendStatus(500);
});

app.post("/adduser", (req, res) => {
  console.log(req.body);
  var failed = userCRUD.addUser(req.body);
  if (failed) {
    res.sendStatus(500);
  }
  //res.sendFile(path.resolve("./ui/screens/chat_screen.html"));
  res.sendStatus(200);
});

app.get("/login", async (req, res) => {
  var email = req.param("email");
  var pass = req.param("password");
  var pass = req.param("password");
  var data = await loginValidation.findUser(email, pass);
  if (data) {
    console.log("data came to get login" + data);
    res.status(200).send(data._id);
  } else {
    res.sendStatus(200);
  }
});
