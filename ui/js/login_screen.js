$(() => {
  $("login_button").click(validateUser);
  $("#create_account").click(setPageForCreateAccount);
  $("login_button").click(validateUser);
});

function setPageForCreateAccount() {
  //console.log("set page for create account called ");
  $(".inputStuff").empty();
  $("#login_button_div").remove();
  $("#create_account").remove();
  $("#dont_have_acc").text("Click to create account");

  $(".inputStuff").append(createAccount);
  $("#create_account_2").click(addUser);
}

function addUser() {
  var user = {
    fullname: $("#full_name_ca").val(),
    userName: $("#user_name_ca").val(),
    email: $("#email_ca").val(),
    password: $("#password_ca").val()
  };

  $.post("http://localhost:3301/adduser", user);
}

function validateUser() {
  user = {
    email: $("#email_login").val(),
    password: $("#password_login").val()
  };

  console.log("validate user called ");
  $.get(
    `http://localhost:3301/login?email=${user.email}&password=${user.password}`,
    data => {
      console.log("yes or no ?:" + data);
    }
  );
}
