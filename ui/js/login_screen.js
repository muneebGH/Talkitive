$(() => {
  $("#create_account").click(setPageForCreateAccount);
});

function setPageForCreateAccount() {
  $(".inputStuff").empty();
  $("#login_button_div").remove();
  $("#dont_have_acc").text("Click to create account");

  $(".inputStuff").append(createAccount);
}
