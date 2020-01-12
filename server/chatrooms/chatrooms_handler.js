var db = require("mongoose");

async function establishConnection() {
  dbUrl = String.raw`mongodb+srv://root:iamroot@users-zkdte.mongodb.net/chatrooms?retryWrites=true&w=majority`;

  await db.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      console.log("a user connected to chatroom ");
      console.log("error in user connection =" + err);
    }
  );
}

var chatRoomSchema = new db.Schema({
  title: String,
  discription: String,
  password: String,
  user: String
});

var chatRoom = db.model("chatRooms", chatRoomSchema);

async function addChatRoom(chatRoomIn) {
  var done = true;

  console.log("adding chatroom below");
  console.log(chatRoomIn);

  var chatRoomToBeInserted = new chatRoom(chatRoomIn);
  await chatRoomToBeInserted.save(err => {
    console.log(err);
    if (err) {
      done = false;
    }
  });

  return done;
}

async function getAll() {
  var res = await chatRoom.find({});
  return res;
}
module.exports = {
  addChatRoom: addChatRoom,
  getAllChatRooms: getAll,
  establishConn: establishConnection
};
