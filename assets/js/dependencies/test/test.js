$(document).ready(function () {
    $('.test-container').load('/showTest');
    $('.question-container').load('/showQuestion');
    $('.answer-form').load('/showAnswer');

    $('#submit-lesson').click(function () {
        var category = $('#inputCategory').val();
        var lesson = $('#inputLesson').val();
        $('#container-lesson').load('/lesson/' + category + '/' + lesson, function (err) {

        })
    });
});
