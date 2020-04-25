$( document ).ready(function() {
    $('#loginForm').validate({
        rules:{
            usernameField:{
                required:true
            },
            passwordField:{
                required:true
            },

        },
        messages:{
            usernameField:{
                required:"Enter your username"
            },
            passwordField:{
                required:"Enter your password"
            },
        },
    });

});
function login(){

    var pass=document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var user=getUser(username);
    if(user==null){
        $( "#wrongUsername" ).dialog();
    }else{
        if(user.password == pass){
            moveTo("setting");

        }else{
            $( "#wrongPassword" ).dialog();
        }
    }
}
