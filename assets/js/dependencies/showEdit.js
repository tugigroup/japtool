/**
 * Created by DuongTD2 on 6/15/2015.
 */
$(document).ready(function(){
    $("#default-hide").hide();
    $("#btnShow").click(function(){
        $("#default-hide").show();
        $("#default-show").hide();
    });

    $("#btnSaveEdit").click(function(){
        $("#default-show").show();
        $("#default-hide").hide();
    });

});