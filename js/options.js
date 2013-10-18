function saveConfig()
{
    var clientID = document.getElementById("clientID").value;
    var clientToken = document.getElementById("clientToken").value;
    saveToLocalStorage("clientID", clientID);
    saveToLocalStorage("clientToken", clientToken);
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("clientID").value = getFromLocalStorage("clientID", '');
    document.getElementById("clientToken").value = getFromLocalStorage("clientToken", '');
    document.getElementById("btn-save-config").addEventListener("click", saveConfig);
});