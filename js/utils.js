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

/* création d'éléments */
/**
 * element est la balise a créer
 * options est un objet litéral: en clef l'attribut a ajouter, en valeur la valeur de l'attribut
 * @param {string} element 
 * @param {object} options 
 * @returns 
 */
function cEO(element, options = {}){
    let newElement = document.createElement(element);
    for(let key in options){
        newElement.setAttribute(key, options[key]);
    }
    return newElement;
}

function jsonResultSearch(data, search = '') {
    search = search.toLowerCase();
    let firstRound = true;
    let thead = '<tr>';
    let tempLine = '';
    let searchOK = ('' === search)?true:false;
    let compare = '';
    let tbody = '';
    data.forEach(element => {
        tempLine = tempLine + '<tr>';
        for (key in element) {
            if (firstRound) {
                thead = thead + `<th>${key}</th>`;
            }
            if ('object' !== typeof (element[key])) {
                compare = element[key].toString().toLowerCase()
                if (compare.indexOf(search) >= 0) {
                    searchOK = true;
                }
                tempLine = tempLine + `<td>`;
                tempLine += (compare.indexOf(search) >= 0 && '' !== search)?`<mark>`: '';
                tempLine = tempLine + `${element[key]}`;
                tempLine += (compare.indexOf(search) >= 0 && '' !== search)?`</mark>`: '';
                tempLine = tempLine + `</td>`;
            } else {
                tempLine = tempLine + `<td>`;
                for (item in element[key]) {
                    if ('object' !== typeof (element[key][item])) {
                        compare = element[key][item].toString().toLowerCase()
                        if (compare.indexOf(search) >= 0) {
                            searchOK = true;
                        }
                       
                        tempLine = tempLine + `<b>${item} : </b> <i>`;
                        tempLine += (compare.indexOf(search) >= 0 && '' !== search)?`<mark>`: '';
                        tempLine = tempLine + `${element[key][item]}`;
                        tempLine += (compare.indexOf(search) >= 0 && '' !== search)?`</mark>`: '';
                        tempLine = tempLine +`</i><br />`;
                    }
                }
                tempLine = tempLine + '</td>';
            }
        }
        tempLine = tempLine + '</tr>';
        if (searchOK) {
            tbody = tbody + tempLine;
        }
        firstRound = false;
        searchOK = false;
        searchOK = ('' === search)?true:false;
        tempLine = '';
    });

    thead = thead + '</tr>';
    return [thead, tbody];
}