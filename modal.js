
  var over=true;
    function openDialog(object){ 
      const data = object.getAttribute("data");
      window.onmousedown=function(e){
        if((e.button==0 || e.button==2) && over){
            $( `#${data}Dialog` ).dialog("close");
        }
      }

        $(  `#${data}Dialog` ).dialog();
        $( "div.alert" )
        .mouseover(function() {
          over=false;

        });
        $(  `#${data}Dialog` ).mouseout(function() {
          over=true;
        });
    }


