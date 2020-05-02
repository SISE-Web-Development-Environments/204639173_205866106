    class User {
        constructor(username, password, fullName, email,birth){
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.birthdate=birth;
      }
    }



var users;

$( document ).ready(function() {
    if (window.localStorage) {
        users=new Array();
        var user1=new User("p","p","babi","H@.com","");
      addUser(user1);
        if(window.localStorage.getItem("users")==null){
          window.localStorage.setItem("users",JSON.stringify(users));
        }
    
    }

      
 
});

function addUser(user){
    users=  JSON.parse(window.localStorage.getItem("users"));
    users.push(user);
    window.localStorage.removeItem("users");
    window.localStorage.setItem("users",JSON.stringify(users));
}
function getUser(userName){ 
       users=JSON.parse(window.localStorage.getItem("users"));
       console.log(users);
        for(var i=0;i<users.length;i++){
            if(users[i].username==userName){
                return users[i];
            }
        }
        return null;
}
