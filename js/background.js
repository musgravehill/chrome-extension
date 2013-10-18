setInterval('checkNoty();', 61000);

function checkNoty() {
    var xhr = new XMLHttpRequest();
    var clientID = getFromLocalStorage("clientID", '');
    var clientToken = getFromLocalStorage("clientToken", '');
    xhr.open("GET", "https://" + clientID + ".site/api/client/getNoty?token=" + clientToken, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = JSON.parse(xhr.responseText);
            processAlert(resp);
        }
    }
    xhr.send();
}

function processAlert(resp) {
    var showNoty = false;
    if (parseInt(resp.taskcom_count) > 0) {
        showNoty = true;
    }
    if (parseInt(resp.taskexe_count) > 0) {
        showNoty = true;
    }
    if (parseInt(getFromLocalStorage("dialog_max", 0)) < parseInt(resp.dialog_max)) {
        showNoty = true;
    }
    if (parseInt(getFromLocalStorage("news_max", 0)) < parseInt(resp.news_max)) {
        showNoty = true;
    }
    if (showNoty) {
        chrome.browserAction.setBadgeBackgroundColor({"color": [250, 22, 22, 200]});
        chrome.browserAction.setBadgeText({text: "new"});
        chrome.browserAction.setIcon({'path': 'images/icon-noty.png'});
    }

}


function getFromLocalStorage(key, defValue)
{
    if (localStorage[key] == null)
    {
        return defValue;
    }
    return localStorage.getItem(key);
}
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch (e) {
    }
}
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    }
    catch (e) {
    }
}