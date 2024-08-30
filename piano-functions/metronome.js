const metronomeButton = document.querySelector(".metronome-button");
const metronomeController = document.querySelector('.metronome-controller');
const metronomeCounter = document.querySelector('.metronome-counter');

let metronomeInterval = 600; // Interval in milliseconds (e.g., 600ms for 100 BPM)
let metronomeContext;
let metronomeGain;
let metronomeRunning = false; // Flag to control the metronome loop

async function startMetronome() {

    // Create a new AudioContext
    metronomeContext = new (window.AudioContext)();
    
    // Create the gain node
    metronomeGain = metronomeContext.createGain();
    metronomeGain.gain.setValueAtTime(0.2, metronomeContext.currentTime); // Volume of the click sound
    metronomeGain.connect(metronomeContext.destination);

    metronomeRunning = true; // Set the flag to true

    // Asynchronous loop for the metronome
    while (metronomeRunning) {
        const now = metronomeContext.currentTime;
        const oscillator = metronomeContext.createOscillator(); // Create a new oscillator for each tick

        oscillator.type = 'sine'; // Square wave for a distinct click sound
        oscillator.frequency.setValueAtTime(1000, now); // Frequency of the click sound
        oscillator.connect(metronomeGain);

        oscillator.start(now); // Start the oscillator
        oscillator.stop(now + 0.05); // Short tick duration

        // Wait for the interval before the next tick
        await new Promise(resolve => setTimeout(resolve, metronomeInterval));
    }
}

function stopMetronome() {
    metronomeRunning = false; // Set the flag to false to stop the loop
    if (metronomeContext) {
        metronomeContext.close(); // Close the audio context
    }
}

function toggleMetronomeController() {
    if (metronomeButton.classList.contains('on')) {
        metronomeController.classList.remove('hidden');
    } else {
        metronomeController.classList.add('hidden');
    }
}

function changeMetronomeBeat() {
    const bpm = parseInt(metronomeCounter.value);
    const interval = (60 / bpm) * 1000; // Convert BPM to milliseconds
    metronomeInterval = interval;
}


document.querySelector(".metronome-button").addEventListener("click", () => {
    if (metronomeButton.classList.contains('on')) {

        metronomeButton.classList.remove('on');
        stopMetronome();
        toggleMetronomeController();

    } else {

        metronomeButton.classList.add('on');
        startMetronome();
        toggleMetronomeController();
    }
});


document.querySelector(".apply-button").addEventListener("click", () => {
    changeMetronomeBeat();
})