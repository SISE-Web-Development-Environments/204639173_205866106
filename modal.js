
var over = true;
function openDialog(object) {
  const data = object.getAttribute("data");
  window.onmousedown = function (e) {
    if ((e.button == 0 || e.button == 2) && over) {
      $(`#${data}Dialog`).dialog("close");
    }
  }
  console.log(`${data}Dialog`);
  if (`${data}Dialog` == "loser100Dialog") {
    console.log( document.getElementById("lblScore").value);
    document.getElementById("loser100Dialog").innerText = "You are better than " + document.getElementById("lblScore").value + " points!";
  }
  $(`#${data}Dialog`).dialog();
  $("div.alert")
    .mouseover(function () {
      over = false;

    });
  $(`#${data}Dialog`).mouseout(function () {
    over = true;
  });
}


