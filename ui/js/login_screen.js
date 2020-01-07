$(() => {
  $("#create_account").click(setPageForCreateAccount);
});

function setPageForCreateAccount() {
  $(".inputStuff").empty();
  $("#login_button_div").remove();

  $(".inputStuff").append(createAccount);
}
