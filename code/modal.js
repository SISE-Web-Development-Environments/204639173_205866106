
var over = true;
function openDialog(object) {
  const data = object.getAttribute("data");
  window.onmousedown = function (e) {
    if ((e.button == 0 || e.button == 2) && over) {
      $(`#${data}Dialog`).dialog("close");
    }
  }
  if (`${data}Dialog` == "loser100Dialog") {
    document.getElementById("loserWithScore").innerHTML = "<br><br>You are better than " + document.getElementById("lblScore").innerText + " points!";

  }
  $(`#${data}Dialog`).dialog({
    autoOpen: true,
        maxWidth:700,
        maxHeight: 400,
        width: 700,
        height: 400,
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


