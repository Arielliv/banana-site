/**
 * Created by Ariel on 15/08/2015.
 */
$(document).ready(function(){

    var loginflag = 0;
    //close login box
    $(".btn-costume").click(function(){
        $(".panel").fadeOut('slow');
    });

    //open loginbox
    $(".navbar-btn:eq(0)").click(function(){
        if(loginflag === 0){
        $(".panel").fadeIn('slow').removeClass("hide");
        }
    });

    //check login box
    $(".panel-footer").click(function(){
        var username = $(".form-control:eq(0)").val();
        var password = $(".form-control:eq(1)").val();
        var reg = /[a-z]+/;
        var flag = 0;
        $(".form-group:eq(0)").removeClass("has-error");
        $(".form-group:eq(1)").removeClass("has-error");
        if(!reg.test(username)){
            $(".form-group:eq(0)").addClass("has-error");
            flag++;
        }
        if(password < 8){
            $(".form-group:eq(1)").addClass("has-error");
            flag++;
        }
        if(flag === 0){
            $(".panel").fadeOut('slow');
            $(".after-login").fadeIn('slow').removeClass("hide");
            loginflag++;
        }
    });
    $('.glyphicon-menu-up').click(function(){
        $(this).toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-up');
    });
});
