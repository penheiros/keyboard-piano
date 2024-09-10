import {toggleVolume} from './script.js';
export const volumeButton = document.querySelector(".volume-button");

const hideNotesButton = document.querySelector(".hide-notes");
const hideKeysButton = document.querySelector(".hide-keys");
const metronomeButton = document.querySelector(".metronome-button");
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
        hideNotesButton.dataset.attr = "Hide Notes";
    } else {
        hideObject(hideNotesButton, notes);
        hideNotesButton.dataset.attr = "Show Notes";
    }
});

document.querySelector(".hide-keys").addEventListener("click", () => {
    if (hideKeysButton.classList.contains('on')) {
        showObject(hideKeysButton, keys);
        hideKeysButton.dataset.attr = "Hide Keys";

    } else {        
        hideObject(hideKeysButton, keys);
        hideKeysButton.dataset.attr = "Show Keys";
    }
});

document.querySelector(".volume-button").addEventListener("click", () => {
    toggleVolume();
})