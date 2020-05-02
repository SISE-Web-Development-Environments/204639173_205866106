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
      users=new Array();
      var user1=new User("p","p","babi","H@.com","");
      users.push(user1);
    console.log("ready" + users);
      if(localStorage.getItem("users"==null)){
        localStorage.setItem("users",JSON.stringify(users));
      }
      
 
});

function addUser(user){
    users=  JSON.parse(localStorage.getItem("users"));
    users.push(user);
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(users));
        console.log("addUser" + users);

}
function getUser(userName){ 
       users=  JSON.parse(localStorage.getItem("users"));
       console.log("getUser" + users);
        for(var i=0;i<users.length;i++){
            if(users[i].username==userName){
                return users[i];
            }
        }
        return null;
}
