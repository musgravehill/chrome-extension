var xhr = new XMLHttpRequest();
var clientID = getFromLocalStorage("clientID", '');
var clientToken = getFromLocalStorage("clientToken", '');
xhr.open("GET", "https://" + clientID + ".site.ru/apiclient/getNoty?token=" + clientToken, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {        
        var resp = JSON.parse(xhr.responseText);
        processNoty(resp);
    }
}
xhr.send();




function processNoty(resp) {
    var currDialogMax = parseInt(getFromLocalStorage("dialog_max", 0));
    var currNewsMax = parseInt(getFromLocalStorage("news_max", 0));


    if (parseInt(resp.taskcom_count) > 0) {
        var taskcomHtml = "<tr><td>Task_out</td><td class='label-important'> " + resp.taskcom_count + "</td></tr>";
    }
    else {
        var taskcomHtml = "<tr><td>Task_out</td><td>-</td></tr>";
    }
    if (parseInt(resp.taskexe_count) > 0) {
        var taskexeHtml = "<tr><td>Task_in</td><td class='label-important'> " + resp.taskexe_count + "</td></tr>";
    }
    else {
        var taskexeHtml = "<tr><td>Task_in</td><td>-</td></tr>";
    }




    if (currDialogMax < parseInt(resp.dialog_max)) {
        var dialogHtml = "<tr><td>Dialogs</td><td class='label-important'>!</td></tr>";
    }
    else {
        var dialogHtml = "<tr><td>Dialogs</td><td>-</td></tr>";
    }
    if (currNewsMax < parseInt(resp.news_max)) {
        var newsHtml = "<tr><td>News</td><td class='label-important'>!</td></tr>";
    }
    else {
        var newsHtml = "<tr><td>News</td><td>-</td></tr>";
    }



    saveToLocalStorage('dialog_max', parseInt(resp.dialog_max));
    saveToLocalStorage('news_max', parseInt(resp.news_max));

    document.getElementById("div-popup-noty").innerHTML =
            "<table border=0>" +
            taskcomHtml +
            taskexeHtml +
            dialogHtml +
            newsHtml +
            "</table>"
            ;

    

    chrome.browserAction.setBadgeBackgroundColor({"color": [0, 0, 0, 255]});
    chrome.browserAction.setBadgeText({text: ""});
    chrome.browserAction.setIcon({'path': 'images/icon.png'});
}


function showOptions()
{
    chrome.tabs.create({url: "https://" + clientID + ".site.ru?reff=chrome-ext"});
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("logo-tt").addEventListener("click", showOptions);
});



/*
 var notification = webkitNotifications.createNotification(
 'images/bamboo.jpg', // icon url - can be relative
 'Hello!', // notification title
 'Lorem ipsum...'  // notification body text
 );
 notification.show();


 var opt = {
 type: "basic",
 title: "Primary Title",
 message: "Primary message to display",
 iconUrl: "1.png"
 };
 
 chrome.notifications.create(0, opt, function() {
 });
 */
