$(document).ready(function () {
    $('.form-register').validate({
        rules: {
            username: {
                required: true
            },
            firstname: {
                required: true
            },
            lastname: {
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
        },
        success: function (element) {
            element.text('OK!').addClass('valid')
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
