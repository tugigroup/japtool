$(document).ready(function () {
  $('.form-register').validate({
    rules: {
      username: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        minlength: 6,
        required: true
      },
      confirmation: {
        minlength: 6,
        equalTo: "#input-password"
      }
    }
  });

  $('#change-pass').validate({
    rules: {
      oldPasswordUser: {
        minlength: 6,
        required: true
      },
      newPasswordUser: {
        minlength: 6,
        required: true
      },
      newPasswordUserCf: {
        minlength: 6,
        required: true,
        equalTo: "#input-NewPassword"
      }
    }
  });

});
