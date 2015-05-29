$(document).ready(function () {
    $('.trainning').load('/tranning');
    $('.answer-form').load('/answerShow');
    $('#submit-test').click(function () {
        var _content = $("#inputContent").val();
        var _image = $("#inputimage").val();
        var _audio = $("#inputAudio").val();
        var _video = $("#inputVideo").val();
        var _level = $("#inputLevel").val();
        var _sort = $("#inputSort").val();
        var _tab = $("#inputTab").val();
        var _category = $("#inputCategory").val();
        var _other = $("#inputOther").val();
        $.ajax({
            method: "POST",
            url: "submitTest",
            data: {
                content: _content,
                image: _image,
                audio: _audio,
                video: _video,
                level: _level,
                sort: _sort,
                tab: _tab,
                category: _category,
                other: _other
            }
        })
            .done(function (msg) {
                alert(msg);
            });
    });

    $('.test-form').validate({
        rules: {
            inputContent: {
                required: true,
                minlength: 6
            },
            inputSort: {
                number: true,
                required: true
            }
        },
        submitHandler: function(form) {

        },
        success: function (element) {
            element.text('OK!').addClass('valid')
        }
    });


});