var db = require("./CRUD");

function findUser(email1) {
  db.userDB.find({ email: email1 }, (err, res) => {
    console.log("err : " + err);
    console.log("res :" + res);
  });
}
