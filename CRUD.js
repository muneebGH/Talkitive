var db = require("mongoose");

async function establishConnection() {
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

var UserSchema = new db.Schema({
  fullName: String,
  userName: String,
  email: String,
  password: String
});

var UserModel = db.model("UserModel", UserSchema);

async function addUserToDB(user) {
  await establishConnection();

  var userToBeInserted = new UserModel(user);
  userToBeInserted.save(err => {
    console.log(err);
    if (err) {
      return false;
    }
    return true;
  });
}

module.exports = {
  addUser: addUserToDB,
  establishConnection: establishConnection,
  userDB: UserModel
};
