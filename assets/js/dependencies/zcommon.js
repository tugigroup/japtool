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

//Show and hidden with search, edit... Of learning and user profile
$(document).ready(function(){
//Hidden with div after show User Profile
  $("#default-hide").hide();
  $("#btnShow").click(function(){
    $("#default-hide").show();
    $("#default-show").hide();
  });
  //Show div affter click save user profile
  $("#btnSaveEdit").click(function(){
    $("#default-show").show();
    $("#default-hide").hide();
  });
//Show div search of manage learning
  $("#btn-show-search").click(function(){
    $("#default-hide").show();
    $("#default-show").hide();
  });

 //Close search of manage learning
  $("#close-search").click(function(){
    $("#default-show").show();
    $("#default-hide").hide();
  });

});
