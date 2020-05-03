
function menuClick(id) {

    var object = id.getAttribute("data");
    removeActiveSection();
    activeSection(object);

}

function removeActiveSection() {
    const section = document.getElementsByClassName("activeSection");
    if (section[0].id == "gameSection") {
        sound.stop();
        window.clearInterval(interval);
        window.clearInterval(intervalMonster);
    }
    section[0].classList.remove("activeSection");


}

function activeSection(clickedName) {

    if (clickedName != "welcome") {
        $("body").css("background-image", "url('style/background3.jpg')");
    } else {
        $("body").css("background-image", "url('style/background2.jpg')")
    }
    var section = document.getElementById("main").querySelector(`#${clickedName}Section`);
    section.classList.add("activeSection");
}

function switchSection(destination) {
    removeActiveSection();
    activeSection(destination);
}
