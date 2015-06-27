/**
 * Created by DuongTD2 on 6/24/2015.
 */
$(document).ready(function(){
    $("#default-hide").hide();
    $("#btn-show-search").click(function(){
        $("#default-hide").show();
        $("#default-show").hide();
    });

    $("#close-search").click(function(){
        $("#default-show").show();
        $("#default-hide").hide();
    });

});