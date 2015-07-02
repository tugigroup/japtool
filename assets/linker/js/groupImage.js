/**
 * Created by DuongTD2 on 6/23/2015.
 */
$(document).ready(function () {
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
});