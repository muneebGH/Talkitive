var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var userCRUD = require("./userHandling/CRUD");
var loginValidation = require("./userHandling/loginValidation");
var messageHandler = require("./messageHandling/holdMessages");
var watsonHandler = require("./IBM-watson/nlu_handler");
var chatRoomHandler = require("./chatrooms/chatrooms_handler");

var senderId = "123";
var recieverId = "456";

userCRUD.establishConnection();
chatRoomHandler.establishConn();

var path = require("path");

app.use(cookieParser());
app.use(express.static(__dirname.substring(0, __dirname.length - 6) + "/ui"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
http.listen(3301, () => {
  console.log("server listening ");
});

io.on("connection", socket => {
  console.log("socket io successfull");
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./ui/screens/login_screen.html"));
});

app.post("/reciever", (req, res) => {
  res.cookie("recieverName", req.body.reciever);
});

app.get("/signup", (req, res) => {
  res.clearCookie("email");
  res.sendFile(path.resolve("./ui/screens/signup_screen.html"));
});
app.get("/chat", (req, res) => {
  senderId = req.cookies.userName;
  recieverId = req.cookies.recieverName;
  res.sendFile(path.resolve("./ui/screens/chat_screen.html"));
});

app.get("/messages", async (req, res) => {
  var resp = await messageHandler.getAllOf(senderId, recieverId);

  res.send(resp);
});

app.post("/messages", (req, res) => {
  var message = {
    sender: senderId,
    reciever: recieverId,
    message: req.body.message
  };

  var done = messageHandler.addMessage(message);
  io.emit("message", message);
  done ? res.sendStatus(200) : res.sendStatus(500);
});

app.post("/adduser", (req, res) => {
  //res.clearCookie("name");
  console.log(req.body);
  var failed = userCRUD.addUser(req.body);
  if (failed) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
  //res.sendFile(path.resolve("./ui/screens/chat_screen.html"));
});

app.get("/selectChatRoom", (req, res) => {
  res.sendFile(path.resolve("./ui/screens/chat_rooms_screen.html"));
});

app.get("/login", async (req, res) => {
  var email = req.param("email");
  var pass = req.param("password");
  var pass = req.param("password");
  var resp = await loginValidation.findUser(email, pass);

  res.cookie("userName", resp[0].userName);
  res.send(resp);
});

//ai stuff

app.post("/ai", (req, res) => {
  res.send(watsonHandler.anaylze());
});

app.get("/cookies", (req, res) => {
  res.send(req.cookies);
});

app.post("/addChatRoom", (req, res) => {
  var chatRoom = req.body;
  user = "";
  user = req.cookies.userName;
  chatRoom.user = user;
  var added = chatRoomHandler.addChatRoom(chatRoom).then(() => {
    if (added) {
      io.emit("chatRoomAdded", chatRoom);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.get("/getAllChatRooms", async (req, res) => {
  var data = await chatRoomHandler.getAllChatRooms();
  res.send(data);
});
