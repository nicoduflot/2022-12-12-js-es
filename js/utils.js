function loaded(callable){
    window.addEventListener('DOMContentLoaded', callable);
}

function qS(selector){
    return document.querySelector(selector);
}

function qSAll(selector){
    return document.querySelectorAll(selector);
}

/* création de cookies */

/**
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
function setCookie(name, value = null, days = -1){
    let maxAge = days * 24 *60 * 60;
    document.cookie = `${name}=${value}; max-age=${maxAge}; Samesite=Strict; Secure`;
}

/* récupérer un cookie s'il existe */
/**
 * @param {string} name
 */
function getCookie(name){
    let tabCookie = document.cookie.split('; ');
    //console.log(tabCookie);
    for(cookie of tabCookie){
        //console.log(cookie);
        let tabValue = cookie.split('=');
        //console.log(tabValue);
        if(tabValue[0] === name){
            return tabValue[1];
        }
    }
    return false;
}