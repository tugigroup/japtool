/**
 * Created by TuyenTV1 on 6/15/2015.
 */

$(document).ready(function () {
    $('#submit').click(function () {
        var username = $('#username').val();
        var id = $('#hiddien_Id').val();
        $.ajax({
            url: '/user/searchUser',
            type: 'POST',
            data: {
                username: username,
                id_origin: id
            },
            cache: false,
            success: function (data) {
                $('#info-User').html('');
                $('#info-User').html(data);
            },
            error: function() {
                alert('loi roi nhe');
            }
        });
    });


    $('#username').keyup(function(){

        var username = $('#username').val();
        var id = $('#hiddien_Id').val();
        $.ajax({
            url: '/user/searchUser',
            type: 'POST',
            data: {
                username: username,
                id_origin: id
            },
            cache: false,
            success: function (data) {
                $('#info-User').html('');
                $('#info-User').html(data);
            },
            error: function() {
                alert('loi roi nhe');
            }
        });

    });




})