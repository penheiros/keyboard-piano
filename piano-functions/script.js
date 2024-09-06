import {notes, keybindings} from "./data.js";
import { volumeButton } from './settings.js';

const audioContext = new (window.AudioContext)();
const noteSounds = {};
const noteBuffers = {};

export let volumeLevel = 0.8;
async function loadSample(note, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    noteBuffers[note] = audioBuffer;
}

async function loadSamples() {
    for (const note of notes) {
        await loadSample(note, `./sounds/${note}.wav`);
    }
}

loadSamples();


notes.forEach(note => {
    const audio = new Audio(`sounds/${note}.wav`);
    audio.preload = 'auto';
    noteSounds[note] = audio;
});


const activeNotes = new Set();
function playNote(note) {
    if ( noteBuffers[note] && !activeNotes.has(note) ) {

        activeNotes.add(note);

        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();

        source.buffer = noteBuffers[note];
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Set up volume control
        gainNode.gain.setValueAtTime(volumeLevel, audioContext.currentTime); // Initial volume
        gainNode.gain.linearRampToValueAtTime(volumeLevel, audioContext.currentTime + 0.1); // Hold volume for 100ms
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.9); // Fade-out over 100ms

        // Start playing the note
        source.start();

        // Stop the source after the fade-out
        source.stop(audioContext.currentTime + 1); // Ensure stop happens after fade-out

        source.onended = () => {
            activeNotes.delete(note);
        };

        document.querySelector(`.${note}`).classList.add("active");
        setTimeout(() => {
            document.querySelector(`.${note}`).classList.remove("active");
        }, 200); // Match the stop time

    }
}

// Handle keyboard input 
document.addEventListener("keydown", (e) => {
    const note = keybindings[e.key.toLowerCase()];
    if (note) {
        playNote(note);
    }
})

document.addEventListener("keyup", (e) => {
    const note = keybindings[e.key.toLowerCase()];
    if (note) {
        activeNotes.delete(note);
    }
})

// Handle mouse input
notes.forEach(note => {
    document.querySelector(`.${note}`).addEventListener("mousedown", (e) => {
        e.stopPropagation();
        playNote(note);
    })
})

notes.forEach(note => {
    document.querySelector(`.${note}`).addEventListener("mouseup", (e) => {
        e.stopPropagation();
        activeNotes.delete(note)
    })
})

// Volume control 
 
export function toggleVolume() {
    if (volumeButton.classList.contains('on')) {
        volumeButton.classList.remove('on');
        volumeLevel = 0.8;
    } else {
        volumeButton.classList.add('on');
        volumeLevel = 0.3;
    }
}
