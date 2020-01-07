$(() => {
  $("#create_account").click(setPageForCreateAccount);
  $("login_button").click(validateUser);
});

function setPageForCreateAccount() {
  $(".inputStuff").empty();
  $("#login_button_div").remove();
  $("#create_account").remove();
  $("#dont_have_acc").text("Click to create account");

  $(".inputStuff").append(createAccount);
  $("#create_account_2").click(addUser);
}

function addUser() {
  console.log(undefined);
  console.log(1);
  console.log(document.getElementById("full_name_ca").value);
  console.log($("#full_name_ca").text());
  var user = {
    fullname: $("#full_name_ca").val(),
    userName: $("#user_name_ca").val(),
    email: $("#email_ca").val(),
    password: $("#password_ca").val()
  };

  console.log(user.fullname);
  $.post("http://localhost:3301/adduser", user);
}

function validateUser() {
  user = {
    email: $("#email_login").val(),
    password: $("#password_login").val()
  };

  $.get("http://localhost:3301/login/email?=");
}
