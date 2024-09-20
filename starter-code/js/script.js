
import { art } from "./art.js";



let btnViewImg = document.querySelector('.viewImg');
let btnCloseImg = document.querySelector('.closeImg');
let fullscreen = document.querySelector('.fullscreen');
//Fullscreen
btnViewImg.addEventListener('click', function() {
    fullscreen.style.display = 'flex';
    document.body.classList.add('noscroll');
});

btnCloseImg.addEventListener('click', function() {
    fullscreen.style.display = 'none';
    document.body.classList.remove('noscroll');
});



