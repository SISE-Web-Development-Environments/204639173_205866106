
var over = true;
function openDialog(object) {
  const data = object.getAttribute("data");
  window.onmousedown = function (e) {
    if ((e.button == 0 || e.button == 2) && over) {
      $(`#${data}Dialog`).dialog("close");
    }
  }
  if (`${data}Dialog` == "loser100Dialog") {
    console.log( document.getElementById("lblScore").value);
    document.getElementById("loser100Dialog").innerText = "You are better than " + document.getElementById("lblScore").value + " points!";
  }
  // $(`#${data}Dialog`).dialog();
  $(`#${data}Dialog`).dialog({
    autoOpen: true,
        maxWidth:700,
        maxHeight: 400,
        width: 600,
        height: 250,
        modal: true,
      });
  $("div.alert")
    .mouseover(function () {
      over = false;

    });
  $(`#${data}Dialog`).mouseout(function () {
    over = true;
  });
}


