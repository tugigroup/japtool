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

    (function($){
        $.fn.extend({
            MyPagination: function(options) {
                var defaults = {
                    height: 400,
                    fadeSpeed: 400
                };
                var options = $.extend(defaults, options);

                //Creating a reference to the object
                var objContent = $(this);

                // other inner variables
                var fullPages = new Array();
                var subPages = new Array();
                var height = 0;
                var lastPage = 1;
                var paginatePages;

                // initialization function
                init = function() {
                    objContent.children().each(function(i){
                        if (height + this.clientHeight > options.height) {
                            fullPages.push(subPages);
                            subPages = new Array();
                            height = 0;
                        }

                        height += this.clientHeight;
                        subPages.push(this);
                    });

                    if (height > 0) {
                        fullPages.push(subPages);
                    }

                    // wrapping each full page
                    $(fullPages).wrap("<div class='page'></div>");

                    // hiding all wrapped pages
                    objContent.children().hide();

                    // making collection of pages for pagination
                    paginatePages = objContent.children();

                    // show first page
                    showPage(lastPage);

                    // draw controls
                    showPagination($(paginatePages).length);
                };

                // update counter function
                updateCounter = function(i) {
                    $('#page_number').html(i);
                };

                // show page function
                showPage = function(page) {
                    i = page - 1;
                    if (paginatePages[i]) {

                        // hiding old page, display new one
                        $(paginatePages[lastPage]).fadeOut(options.fadeSpeed);
                        lastPage = i;
                        $(paginatePages[lastPage]).fadeIn(options.fadeSpeed);

                        // and updating counter
                        updateCounter(page);
                    }
                };

                // show pagination function (draw switching numbers)
                showPagination = function(numPages) {
                    var pagins = '';
                    for (var i = 1; i <= numPages; i++) {
                        pagins += '<li><a href="#" onclick="showPage(' + i + '); return false;">' + i + '</a></li>';
                    }
                    $('.pagination li:first-child').after(pagins);
                };

                // perform initialization
                init();

                // and binding 2 events - on clicking to Prev
                $('.pagination #prev').click(function() {
                    showPage(lastPage);
                });
                // and Next
                $('.pagination #next').click(function() {
                    showPage(lastPage+2);
                });

            }
        });
    })(jQuery);

    // custom initialization
    jQuery(window).load(function() {
        $('#content').MyPagination({height: 400, fadeSpeed: 400});
    });

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
    //Validate user edit info form
    $('#input-firstname').keyup(function () {
        var fName = $('#input-firstname').val();
        var messfName = $('#user-edit-mess-fName').removeClass();

        if (fName == "" || fName == null) {
            messfName.addClass('error').text('First name is required!').show();
        } else {
            messfName.hide();
        }
    });
    $('#input-lastname').keyup(function () {
        var lName = $('#input-lastname').val();
        var messlName = $('#user-edit-mess-lName').removeClass();

        if (lName == "" || lName == null) {
            messlName.addClass('error').text('Last name is required!').show();
        } else {
            messlName.hide();
        }
    });
    $('#input-email').keyup(function () {
        var emailREG = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var email = $('#input-email').val();
        var messemail = $('#user-edit-mess-email').removeClass();

        if (email == "" || email == null) {
            messemail.addClass('error').text('Email is required!').show();
        } else if (!emailREG.test(email)) {
            messemail.addClass('error').text('Your email is invalid!').show();
        } else {
            messemail.hide();
        }
    });
    $("#btnSaveEdit").click(function () {
        var fName = $('#input-firstname').val();
        var messfName = $('user-edit-mess-fName').removeClass();
        var lName = $('#input-lastname').val();
        var messlName = $('#user-edit-mess-lName').removeClass();
        var emailREG = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var email = $('#input-email').val();
        var messemail = $('#user-edit-mess-email').removeClass();
        var valid = true;
        if (fName == "" || fName == null) {
            messfName.addClass('error').text('First name is required!').show();
            valid = false;
        }
        if (lName == "" || lName == null) {
            messlName.addClass('error').text('Last name is required!').show();
            valid = false;
        }
        if (email == "" || email == null) {
            messemail.addClass('error').text('Email is required!').show();
            valid = false;
        } else if (!emailREG.test(email)) {
            messemail.addClass('error').text('Your email is invalid!').show();
            valid = false;
        }
        if (valid) {
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
        }
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

    //UPLOAD AVATAR USER IN PROFILE
    document.getElementById("uploadBtnAvatar").onchange = function () {
        document.getElementById("uploadAvatar").value = this.value;
    };

    function readAvatar(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {
                $('#avatarPreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#uploadBtnAvatar").change(function () {
        readAvatar(this);
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
