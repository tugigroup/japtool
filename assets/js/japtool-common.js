//ICON
$(function () {
    var all_classes = "";
    var timer = undefined;
    $.each($('li', '.social-class'), function (index, element) {
        all_classes += " btn-" + $(element).data("code");
    });
    $('li', '.social-class').mouseenter(function () {
        var icon_name = $(this).data("code");
        if ($(this).data("icon")) {
            icon_name = $(this).data("icon");
        }
        var icon = "<i class='fa fa-" + icon_name + "'></i>";
        $('.btn-social', '.social-sizes').html(icon + "Sign in with " + $(this).data("name"));
        $('.btn-social-icon', '.social-sizes').html(icon);
        $('.btn', '.social-sizes').removeClass(all_classes);
        $('.btn', '.social-sizes').addClass("btn-" + $(this).data('code'));
    });
    $($('li', '.social-class')[Math.floor($('li', '.social-class').length * Math.random())]).mouseenter();
});


//CustomScrollbar
(function ($) {
    $(window).load(function () {
        $(".content").mCustomScrollbar();
    });
})(jQuery);

//USER BRANCH
//Show and hidden with search, edit... Of learning and user profile
$(document).ready(function () {

    //Show div search of manage learning
    $("#btn-show-search").click(function () {
        $("#default-hide").show();
        $("#default-show").hide();
    });

    //Close search of manage learning
    $("#close-search").click(function () {
        $("#default-show").show();
        $("#default-hide").hide();
    });

    //Show and hiden icon Upload avatar image of page create learning
    $("#btnUp").hide();
    $("#imgGr").hover(function () {
        $("#btnUp").show();
        $(this).css("opacity", "0.4");
    }, function () {
        $(this).css("opacity", "1");
        $("#btnUp").hide();
    });

    $("#btnUp").hover(function () {
        $("#btnUp").show();
        $("#imgGr").css("opacity", "0.4");
    }, function () {
        $("#imgGr").css("opacity", "1");
        $("#btnUp").hide();
    });

    $('#btnShow').click(function () {
        var idUser = $('#idUser').val();
        $.ajax({
            url: '/japtool/user/edit',
            type: 'GET',
            data: {
                id: idUser
            },
            cache: false,
            async: false,
            success: function (data) {
                $('#default-show').html('');
                $('#default-show').html(data);
            },
            error: function () {
                alert('Error')
            }
        })
    });
    $("#btnSaveEdit").click(function () {
        $.ajax({
            url: '/japtool/user/update',
            type: 'POST',
            data: $('form#edit-info').serialize(),
            cache: false,
            success: function (data) {
                $('#default-show').html('');
                $('#default-show').html(data);
            },
            error: function () {
                alert('loi roi nhe');
            }
        });
    });

    //remove old message when user update password information
    $('#input-NewPassword, #input-PasswordCf').keyup(function () {
        $('#change-pass-mess').removeClass().text('');
    });
    $("#btnSaveChangePass").click(function () {
        var userId = $('#idUser').val();
        var oldPass = $('#input-OldPassword').val();
        var newPass = $('#input-NewPassword').val();
        var newPassCf = $('#input-PasswordCf').val();
        var mess = $('#change-pass-mess').removeClass();

        //Vì dùng ajax nên jquery không b?t ???c các l?i này (nó d?a trên s? ki?n submit form)
        if (oldPass == "" || oldPass == null || newPass == "" || newPass == null || newPassCf == "" || newPassCf == null) {
            //All field required
            mess.addClass('error').text('All field is required!').show();
        } else if (newPass === oldPass) {
            //New pass and old are same
            mess.addClass('error').text('Current pass and the new one are the same!').show();
        }
        else {
            //Ajax change pass function
            $.ajax({
                url: '/japtool/user/changePass',
                type: 'POST',
                data: {
                    id: userId,
                    oldPass: oldPass,
                    newPass: newPass,
                    newPassCf: newPassCf
                },
                cache: false,
                success: function (data) {
                    if (data.code == 'error') {
                        mess.addClass('error').text(data.mess).show();
                    } else {
                        mess.addClass('valid').text(data.mess).show();
                        //reset form when update success
                        $('#change-pass')[0].reset();
                    }
                },
                error: function () {
                    mess.addClass('error').text('Something is wrong, please try again later.').show();
                }
            })
        }
    });

    // Author: xuandt2
    // Page: create learning, show popup search learning
    $('[data-toggle="modal"]').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/japtool/learning/search',
            cache: false,
            success: function (msg) {
                $('#show-popup-search').html('');
                $('#show-popup-search').html(msg);
                $('#show-popup-search').modal('open');
            },
            error: function () {
                alert('Error');
            }
        });
    });
});

// Close popup
$('.close-popup').click(function (e) {
    $('#show-popup-search').close();
});