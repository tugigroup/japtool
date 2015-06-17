$(document).ready(function () {
    $('.test-container').load('/test/question/show');
    $('.question-container').load('/test/question/getForm');
    $('.answer-form').load('/test/question/getFormAnswer');

    $('#submit-lesson').click(function () {
        var category = $('#inputCategory').val();
        var lesson = $('#inputLesson').val();
        $('#container-lesson').load('/lesson/' + category + '/' + lesson, function (err) {

        })
    });


});


var app = angular.module('chatApp', []);
app.controller('chatController', ['$http', '$log', '$scope', function ($http, $log, $scope) {
    $scope.predicate = '-id';
    $scope.reverse = true;
    io.socket.get('/chatgroup/createRes');
    $scope.sendMessage = function () {
        io.socket.post('/chatgroup/getMessage', {message: $scope.message, userID: $scope.userID});
        $scope.message = '';
    };
    $scope.sendEnter = function (event) {
        if(event.keyCode == 13){
            io.socket.post('/chatgroup/getMessage', {message: $scope.message, userID: $scope.userID});
            $scope.message = '';
        }
    };
    $scope.chatList = [];
    io.socket.on('chatgroup', function (obj) {
        if (obj.verb == 'created') {
            $scope.chatList.push(obj.data);
            $scope.$digest();
        }
    });
    $scope.message = 'Chat Here';
    $scope.userID = 'Your Name';
}]);
