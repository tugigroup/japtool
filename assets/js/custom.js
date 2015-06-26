/**
 * Created by TuyenTV1 on 6/15/2015.
 */
//Edit information user when click button
$(document).ready(function(){
    $('#btnShow').click(function(){
        var idUser = $('#idUser').val();
        $.ajax({
            url:'/japtool/user/edit',
            type:'POST',
            data:{
                id:idUser
            },
            cache:false,
            success:function(data){
                $('#default-hide').html('');
                $('#default-hide').html(data);
            },
            error:function(){
                alert('Error')
            }
        })
    });
});

//Search user when click button
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