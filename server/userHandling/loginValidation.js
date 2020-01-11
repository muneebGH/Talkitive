var db = require("./CRUD");

async function findUser(email1, pass) {
  console.log("email :" + email1 + "pass:" + pass);
  var res = await db.userDB.find({ email: email1 }, (err, res) => {
    console.log("err in find user  : " + err);
  });

  return res;
}

module.exports = {
  findUser: findUser
};
