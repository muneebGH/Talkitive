var createAccount = String.raw`



<label for="full_name_ca">Full name</label>
<input class="form-control" type="text" placeholder="john doe" id="full_name_ca"/>
</br>




<label for="user_name_ca">User name</label>
<input class="form-control" type="text" placeholder="johndoe123" id="user_name_ca"/>


</br>
<div id="email_form" class="form-group">
<label for="email_ca">Email address</label>
<input
  type="email"
  class="form-control"
  id="email_ca"
  aria-describedby="emailHelp"
  placeholder="Enter email"
/>
<small id="email_help" class="form-text text-muted"
  >Enter a valid email address: u will be asked to verify it.</small
>
</div>
<div id="password_form" class="form-group">
<label for="password_ca">Password</label>
<input
  type="password"
  class="form-control"
  id="password_ca"
  placeholder="Password"
/>

</div>

<button
id="create_account_2"
type="button"
class="btn btn-danger btn-lg btn-block"
>
Create Account
</button>`;

function incomingMessage(text) {
  return String.raw`<div class="incoming_msg">
  <div class="incoming_msg_img">
    <img
      src="https://ptetutorials.com/images/user-profile.png"
      alt="sunil"
    />
  </div>
  <div class="received_msg">
    <div class="received_withd_msg">
      <p>${text}</p>
      <span class="time_date"> 11:01 AM | June 9</span>
    </div>
  </div>
</div>`;
}

function outgoingMessage(text) {
  return String.raw`<div class="outgoing_msg">
  <div class="sent_msg">
    <p>${text}</p>
    <span class="time_date"> 11:01 AM | June 9</span>
  </div>
</div>`;
}