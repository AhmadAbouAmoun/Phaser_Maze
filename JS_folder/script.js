function ShareData() {
    var user_name = document.getElementById("username").value;
    var option = document.getElementById("Character").value;
    if (user_name) {
        localStorage.setItem("username", user_name);
        localStorage.setItem("character", option);
        window.location.href = "Game.html";
    } else alert("Please first enter a user name");
}
