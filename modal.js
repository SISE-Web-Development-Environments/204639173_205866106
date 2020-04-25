
  var over=false;
    function openDialog(){ 
      window.onmousedown=function(e){
        if((e.button==0 || e.button==2) && over){
            $( 'div.aboutDialog1' ).dialog("close");
            //over=false;
        }
      }
        $( '#aboutDialog' ).dialog();
        over=false;
        $( "div.aboutDialog1" )
        .mouseover(function() {
          over=false;
          console.log("now we in");

        });
        $( "div.aboutDialog1" ).mouseout(function() {
          over=true;
          console.log("now we out");
        });
        $( "div.mainDialog" ).mouseover(function() {
          over=true;
          console.log("now we main");
        });
    }


