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

    $("#btnSaveEdit").on('click', function () {
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

    // Author: xuandt2
    // Page: create learning, show popup search learning
    $('[data-toggle="modal"]').click(function (e) {
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