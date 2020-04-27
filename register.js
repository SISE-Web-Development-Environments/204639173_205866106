 

$(document).ready(function () {
});


function submitRegister() {
    //check validation
    $('#registerForm').validate({
        rules: {
            nameField: {
                pattern: '^[a-zA-Z]*$',
                required: true
            },
            usernameField: {
                required: true
            },
            passwordField: {
                pattern: '^(?=.*\\d)(?=.*[a-zA-Z]).{8,200}$',
                required: true,
                minlength: 6
            },
            emailField: {
                required: true,
                email: true
            },
            birthdayField: {
                required: true
            },
        },
        messages: {
            nameField: {
                pattern: " Only letters",
                required: " This field is required"

            },
            usernameField: {
                required: " This field is required"
            },
            passwordField: {
                pattern: " Your password must contain numbers and letters",
                required: " This field is required",
                minlength: " The password must be at least 6 characters"
            },
            emailField: {
                required: " This field is required",
                email: " Your email format is incorrect"
            },
            birthdayField: {
                required: " This field is required"
            },
        },
    });

    let username = document.getElementById("usernameField").value;
    let validCheck = document.getElementById("registerForm");
    if ($('#registerForm').valid()) {

        var user =getUser(username);
        if (user != null) {
            openDialog(document.getElementById("registeUsernameExistsDialog"));
        } else {
            creatrUser();
            moveTo('login');
        }
    }


}

function creatrUser() {
    let name = document.getElementById("nameField").value;
    let userName = document.getElementById("usernameField").value;
    let password = document.getElementById("passwordField").value;
    let email = document.getElementById("emailField").value;
    let birthday = document.getElementById("birthdayField").value;
    var user = new User(userName, password, name, email, birthday ) ;
    console.log(user);
    addUser(user);
}

