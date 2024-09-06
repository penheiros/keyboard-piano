import {toggleVolume} from './script.js';

const hideNotesButton = document.querySelector(".hide-notes");
const hideKeysButton = document.querySelector(".hide-keys");
const metronomeButton = document.querySelector(".metronome-button");
export const volumeButton = document.querySelector(".volume-button");
const volumeIcon = document.querySelector(".volume-icon");

const notes = document.querySelector(".note-container");
const keys = document.querySelectorAll(".note-label");


function hideObject(button, object) {
    button.classList.add('on');

    if(object === notes) {
        object.classList.add('hidden')
    } else {
        object.forEach(key => key.style.visibility = "hidden");
    }
}

function showObject(button, object) {
    button.classList.remove('on');    
    button.style.background = 'white';

    if(object === notes) {
        object.classList.remove('hidden')
    } else {
        object.forEach(key => key.style.visibility = "visible");
    }
}

document.querySelector(".hide-notes").addEventListener("click", () => {
    if (hideNotesButton.classList.contains('on')) {
        showObject(hideNotesButton, notes);
    } else {
        hideObject(hideNotesButton, notes);
    }
});

document.querySelector(".hide-keys").addEventListener("click", () => {
    if (hideKeysButton.classList.contains('on')) {
        showObject(hideKeysButton, keys);
    } else {
        hideObject(hideKeysButton, keys);
    }
});

document.querySelector(".volume-button").addEventListener("click", () => {
    toggleVolume();
})