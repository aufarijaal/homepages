// Function to show time
function refreshTime() {
    var dateString = new Date().toLocaleString(navigator.language, {
        timeZone: "Asia/Jakarta", hour: '2-digit', minute:'2-digit', second: '2-digit', hour12: false });
    var formattedString = dateString.replace(", ", " - ");
    timeDisplay.innerHTML = formattedString;
}

const element = document.querySelector(".card").tilt({
    scale:2
});
VanillaTilt.init(element);
element.addEventListener("tiltChange", callback);