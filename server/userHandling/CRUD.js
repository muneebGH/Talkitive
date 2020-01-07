var db = require("mongoose");

function establishConnection() {
  dbUrl = String.raw`mongodb+srv://root:iamroot@users-zkdte.mongodb.net/test?retryWrites=true&w=majority`;

  db.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      console.log("a user connected ");
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

function addUserToDB(user) {
  // establishConnection();

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
  connectUserDb: establishConnection,
  userDB: UserModel
};
