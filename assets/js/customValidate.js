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

    /**
     * validate jquery by xuandt2
     */
    $('#create-learning').validate({
        rules: {
            nameLearning: {
                required: true,
                minlength: 5,
                maxlength: 50
            },

            description: {
                required: true
            },
            startDate: {
                required: true
            },
            finishDate: {
                required: true,
                greaterThan: "#startDate"
            }
        },

        messages: {
            nameLearning: {
                required: "Please input class name.",
                minlength: "Class name greater than 5 characters.",
                maxlength: "Class name less than 50 characters."
            },
            description: {
                required: "Please input décription."
            },
            startDate: {
                required: "Please input start date."
            },
            finishDate: {
                required: "Please input end date.",
                greaterStart: "Start date less than end date."
            }
        },

        success: {},
        error: function (element) {

        }
    });
});