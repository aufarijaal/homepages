var timeDisplay = document.getElementById("time");
var greeting = document.getElementById("greeting");
var quotes = document.getElementById("quotes");
var today = new Date()
var currentHour = today.getHours()

if (currentHour >= 0 && currentHour < 6) {
    greeting.innerHTML = 'Mau ngapain pagi-pagi begini?';
} else if (currentHour >= 6 && currentHour < 10) {
    greeting.innerHTML = 'Selamat Pagi';
} else if (currentHour >= 10 && currentHour < 15) {
    greeting.innerHTML = 'Selamat Siang';
} else if (currentHour >= 15 && currentHour < 19) {
    greeting.innerHTML = 'Selamat Sore';
} else {
    greeting.innerHTML = 'Selamat Malam';
}

var ran = Math.floor( Math.random() * kataMotivasi.length );
quotes.innerHTML = kataMotivasi[ran];
setInterval(refreshTime, 1000);
ChangeIt();