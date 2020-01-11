

var db = require("mongoose");

function establishConnection() {
  dbUrl = String.raw`mongodb+srv://root:iamroot@users-zkdte.mongodb.net/test?retryWrites=true&w=majority`;

  db.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      console.log("a user connected ");
      console.log("error in user connection =" + err);
    }
  );
}

var Messages = new db.Schema({
  sender: String,
  reciever: String,
  message: String
});

var message = db.model("Messages", Messages);

async function addMessage(messageIn) {
  var done = true;
  await establishConnection();
  var messageToBeInserted = new message(messageIn);
  messageToBeInserted.save(err => {
    if (err) {
      done = false;
    }
  });

  return done;
}

async function getAllOf(senderIn, recieverIn) {
  var res = await message.find({ sender: senderIn, reciever: recieverIn });

  return res;
}

module.exports = {
  connectMessageDb: establishConnection,
  addMessage: addMessage,
  getAllOf: getAllOf
};
