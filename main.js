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
window.onload = function() {

    (function()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad')  )
    {
      localStorage['firstLoad'] = true;
    //   window.location.reload();
      users=new Array();
      window.localStorage.setItem("users",JSON.stringify(users))
      var user1=new User("p","p","p","p@.com","");
      addUser(user1);
    }
  }
})();
}

// $( document ).ready(function() {


// });

function addUser(user){
    users=  JSON.parse(localStorage.getItem("users"));
    users.push(user);
    window.localStorage.removeItem("users");
    window.localStorage.setItem("users",JSON.stringify(users));

}
function getUser(userName){ 

    users =JSON.parse(window.localStorage.getItem("users"));
        for(var i=0;i<users.length;i++){
            if(users[i].username==userName){
                return users[i];
            }
        }
        return null;
}
