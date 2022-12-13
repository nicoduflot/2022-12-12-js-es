function loaded(callable){
    window.addEventListener('DOMContentLoaded', callable);
}

function qS(selector){
    return document.querySelector(selector);
}