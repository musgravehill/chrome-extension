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