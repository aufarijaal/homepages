function refreshTime() {
    var dateString = new Date().toLocaleString(navigator.language, {
        timeZone: "Asia/Jakarta", hour: '2-digit', minute:'2-digit', hour12: false });
    var formattedString = dateString.replace(", ", " - ");
    timeDisplay.innerHTML = formattedString;
}

function ChangeIt() 
{
    var num = Math.ceil( Math.random() * totalCount );
    document.body.background = 'img/'+num+'.jpg';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
}   