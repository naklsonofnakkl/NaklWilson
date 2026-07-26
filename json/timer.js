// Selecting elements for YuGiOh
const timerDisplayYO = document.getElementById("time-yo");
const startButtonYO = document.getElementById("startBtn-yo");
const resetButtonYO = document.getElementById("resetBtn-yo");
const addButtonYO = document.getElementById("addBtn-yo");
const subButtonYO = document.getElementById("subBtn-yo");
const customButtonYO = document.getElementById("customBtn-yo");
const timerContainerYO = document.getElementById("timerDisplay-yo");
const minInputYO = document.getElementById("custom-minutes-yo");
const secInputYO = document.getElementById("custom-seconds-yo");
const openButtonYO = document.getElementById("openBtn-yo");
const muteButtonYO = document.getElementById("muteBtn-yo");

// Selecting elements for OnePiece
const timerDisplayOP = document.getElementById("time-op");
const startButtonOP = document.getElementById("startBtn-op");
const resetButtonOP = document.getElementById("resetBtn-op");
const addButtonOP = document.getElementById("addBtn-op");
const subButtonOP = document.getElementById("subBtn-op");
const customButtonOP = document.getElementById("customBtn-op");
const timerContainerOP = document.getElementById("timerDisplay-op");
const minInputOP = document.getElementById("custom-minutes-op");
const secInputOP = document.getElementById("custom-seconds-op");
const openButtonOP = document.getElementById("openBtn-op");
const muteButtonOP = document.getElementById("muteBtn-op");

// Selecting elements for RiftBound
const timerDisplayRB = document.getElementById("time-rb");
const startButtonRB = document.getElementById("startBtn-rb");
const resetButtonRB = document.getElementById("resetBtn-rb");
const addButtonRB = document.getElementById("addBtn-rb");
const subButtonRB = document.getElementById("subBtn-rb");
const customButtonRB = document.getElementById("customBtn-rb");
const timerContainerRB = document.getElementById("timerDisplay-rb");
const minInputRB = document.getElementById("custom-minutes-rb");
const secInputRB = document.getElementById("custom-seconds-rb");
const openButtonRB = document.getElementById("openBtn-rb");
const muteButtonRB = document.getElementById("muteBtn-rb");

// Selecting elements for UnionArena
const timerDisplayUA = document.getElementById("time-ua");
const startButtonUA = document.getElementById("startBtn-ua");
const resetButtonUA = document.getElementById("resetBtn-ua");
const addButtonUA = document.getElementById("addBtn-ua");
const subButtonUA = document.getElementById("subBtn-ua");
const customButtonUA = document.getElementById("customBtn-ua");
const timerContainerUA = document.getElementById("timerDisplay-ua");
const minInputUA = document.getElementById("custom-minutes-ua");
const secInputUA = document.getElementById("custom-seconds-ua");
const openButtonUA = document.getElementById("openBtn-ua");
const muteButtonUA = document.getElementById("muteBtn-ua");

// Selecting elements for GrandArchive
const timerDisplayGA = document.getElementById("time-ga");
const startButtonGA = document.getElementById("startBtn-ga");
const resetButtonGA = document.getElementById("resetBtn-ga");
const addButtonGA = document.getElementById("addBtn-ga");
const subButtonGA = document.getElementById("subBtn-ga");
const customButtonGA = document.getElementById("customBtn-ga");
const timerContainerGA = document.getElementById("timerDisplay-ga");
const minInputGA = document.getElementById("custom-minutes-ga");
const secInputGA = document.getElementById("custom-seconds-ga");
const openButtonGA = document.getElementById("openBtn-ga");
const muteButtonGA = document.getElementById("muteBtn-ga");

// Selecting elements for Digimon
const timerDisplayDM = document.getElementById("time-dm");
const startButtonDM = document.getElementById("startBtn-dm");
const resetButtonDM = document.getElementById("resetBtn-dm");
const addButtonDM = document.getElementById("addBtn-dm");
const subButtonDM = document.getElementById("subBtn-dm");
const customButtonDM = document.getElementById("customBtn-dm");
const timerContainerDM = document.getElementById("timerDisplay-dm");
const minInputDM = document.getElementById("custom-minutes-dm");
const secInputDM = document.getElementById("custom-seconds-dm");
const openButtonDM = document.getElementById("openBtn-dm");
const muteButtonDM = document.getElementById("muteBtn-dm");

// Starting configurations
const yoSTMin = 44; const yoSTSec = 59;
const opSTMin = 34; const opSTSec = 59;
const rbSTMin = 59; const rbSTSec = 59;
const uaSTMin = 29; const uaSTSec = 59;
const gaSTMin = 59; const gaSTSec = 59;
const dmSTMin = 44; const dmSTSec = 59;

function formatTime(num) {
    return String(num).padStart(2, '0');
}

// Reset Alarm Choice
document.addEventListener('DOMContentLoaded', () => {
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.selectedIndex = 0;
    });
});

// Initialize the single shared Broadcast Channel
const bc = new BroadcastChannel('tcg_timer_channel');

// Sound Effects
const soundLibrary = {
    siren: new Audio('./music/tcg_timer/siren.wav'),
    alarm1: new Audio('./music/tcg_timer/alarm.wav'),
    alarm2: new Audio('./music/tcg_timer/alarm2.wav'),
    countdown6: new Audio('./music/tcg_timer/countdown6.flac'),
    onepiece: new Audio('./music/tcg_timer/onepiece.wav')
};

const muteState = {};

function toggleMute(idSuffix) {
    const muteBtn = document.getElementById(`muteBtn-${idSuffix.toLowerCase()}`);
    if (!muteBtn) return;

    muteState[idSuffix] = !muteState[idSuffix];
    const isMuted = muteState[idSuffix];

    if (isMuted) {
        stopAllSounds();
    }

    const imageFile = isMuted ? "mute.webp" : "unmute.webp";
    const altText = isMuted ? "Mute" : "Unmute";

    muteBtn.innerHTML = `
        <picture class="ui-picture"> 
            <img class="ui-button" src="./images/tcg_timer/ui/${imageFile}" alt="${altText}">
        </picture>
    `;
}

function playSelectedSound(targetId) {
    if (muteState[targetId]) return;

    const dropdown = document.getElementById(`soundSelect-${targetId}`);
    if (!dropdown) return;

    const selectedKey = dropdown.value;
    const audio = soundLibrary[selectedKey];

    if (audio) {
        stopAllSounds();
        audio.currentTime = 0;
        audio.play().catch(err => console.log(`Playback blocked/failed for ${selectedKey}:`, err));
    }
}

function playSound(name, targetId) {
    if (targetId && muteState[targetId]) return;

    stopAllSounds();

    const audio = soundLibrary[name];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(err => console.log(`Playback failed for ${name}:`, err));
}

function stopAllSounds() {
    Object.values(soundLibrary).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}


// Navigation Bar Function
function toggleMultiSection(targetId, clickedButton) {
    const rawId = targetId;
    const lowerId = targetId.toLowerCase();
    const buttonId = clickedButton?.id || '';
    if (buttonId === `timerBtn-${lowerId}`) {
        const customTimerSection = document.getElementById(`customTimer-${lowerId}`);
        if (customTimerSection) {
            customTimerSection.toggleAttribute('hidden');
        }
    }
    else if (buttonId === `alarmBtn-${lowerId}`) {
        const customAlarmSection = document.getElementById(`soundTimer-${rawId}`);
        if (customAlarmSection) {
            customAlarmSection.toggleAttribute('hidden');
        }
    }
    else {
        const targetSection = document.getElementById(`timerScreen-${rawId}`);
        if (targetSection) {
            targetSection.toggleAttribute('hidden');
        }
    }
    clickedButton.classList.toggle('active');
}



// Unique Timer Function
function setupTimer(gameId, display, startBtn, resetBtn, addBtn, subBtn, customBtn, container, openBtn, startMin, startSec, minInput, secInput) {
    let minutes = startMin;
    let seconds = startSec;
    let isRunning = false;
    let interval = null;

    // Define Timer Status Function
    function updateTimerDisplay(forcedStatus) {
        const timeString = `${formatTime(minutes)}:${formatTime(seconds)}`;
        display.innerHTML = timeString;
        let currentStatus = isRunning ? "running" : "stopped";
        if (forcedStatus) currentStatus = forcedStatus;
        bc.postMessage({
            type: 'UPDATE',
            game: gameId,
            time: timeString,
            status: currentStatus
        });
    }

    // New Tab Launcher Button Functionality
    if (openBtn) {
        openBtn.addEventListener("click", function () {
            window.open(`timerfs.html?game=${gameId}`, '_blank');
        });
    }


    // Start / Stop functionality
    startBtn.addEventListener("click", function () {
        if (!isRunning) {
            isRunning = true;
            display.classList.add("is-running");
            display.classList.remove("is-stopped");
            container.classList.add("is-running");
            container.classList.remove("is-stopped");
            startBtn.innerHTML = `
        <picture class="ui-picture"> 
            <img class="ui-button" src="./images/tcg_timer/ui/stop.webp" alt="stop">
        </picture>
    `;
            container.style.border = "5px solid var(--timergo-color)";

            interval = setInterval(() => {
                if (seconds > 0 || minutes > 0) {
                    if (seconds === 0) {
                        seconds = 59;
                        minutes--;
                    } else {
                        seconds--;
                    }
                    const totalSeconds = (minutes * 60) + seconds;
                    if (totalSeconds < 11 && totalSeconds > 0) {
                        playSound('countdown6', gameId);
                    }
                    updateTimerDisplay();
                } else {
                    clearInterval(interval);
                    stopAllSounds();
                    playSelectedSound(gameId);
                    isRunning = false;
                    startBtn.innerHTML = `
        <picture class="ui-picture"> 
            <img class="ui-button" src="./images/tcg_timer/ui/start.webp" alt="start">
        </picture>
    `;
                    display.classList.remove("is-running");
                    container.classList.remove("is-running");
                    updateTimerDisplay();
                }
            }, 1000);
        } else {
            clearInterval(interval);
            isRunning = false;
            display.classList.remove("is-running");
            display.classList.add("is-stopped");
            container.classList.remove("is-running");
            container.classList.add("is-stopped");
            container.style.border = "5px solid var(--timerstop-color)";
            startBtn.innerHTML = `
        <picture class="ui-picture"> 
            <img class="ui-button" src="./images/tcg_timer/ui/start.webp" alt="start">
        </picture>    `;
            updateTimerDisplay();
        }
    });

    // Reset functionality
    resetBtn.addEventListener("click", function () {
        clearInterval(interval);
        isRunning = false;
        minutes = startMin;
        seconds = startSec;
        container.style.border = "5px solid var(--timerborder-color)";
        display.classList.remove("is-running", "is-stopped");
        container.classList.remove("is-running", "is-stopped");
        updateTimerDisplay("reset");
        startBtn.innerHTML = `
        <picture class="ui-picture"> 
            <img class="ui-button" src="./images/tcg_timer/ui/start.webp" alt="start">
        </picture>    `;
    });

    // +5 Minutes Button
    addBtn.addEventListener("click", function () {
        minutes += 5;
        updateTimerDisplay();
    });
    // -5 Minutes Button
    subBtn.addEventListener("click", function () {
        minutes -= 5;
        updateTimerDisplay();
    });

    // Custom Form Button Handler
    if (customBtn && minInput && secInput) {
        customBtn.addEventListener("click", function () {
            clearInterval(interval);
            isRunning = false;
            startBtn.innerHTML = `
        <picture class="ui-picture"> 
            <img class="ui-button" src="./images/tcg_timer/ui/start.webp" alt="start">
        </picture>    `;
            container.style.border = "5px solid var(--timerborder-color)";
            display.classList.remove("is-running", "is-stopped");
            container.classList.remove("is-running", "is-stopped");

            let inputMin = minInput.value.trim();
            let inputSec = secInput.value.trim();

            if (inputMin === "" && inputSec === "") {
                alert("Please enter a value into the minutes or seconds field.");
                return;
            }

            let parsedMin = inputMin !== "" ? parseInt(inputMin, 10) : 0;
            let parsedSec = inputSec !== "" ? parseInt(inputSec, 10) : 0;

            if (isNaN(parsedMin) || isNaN(parsedSec) || parsedMin < 0 || parsedSec < 0 || parsedSec > 59) {
                alert("Invalid configuration. Minutes must be positive. Seconds must be strictly between 0 and 59.");
                return;
            }

            minutes = parsedMin;
            seconds = parsedSec;
            minInput.value = "";
            secInput.value = "";
            updateTimerDisplay("reset");
        });
    }

    updateTimerDisplay();
}

// Global initialization sequence mapping nodes
window.onload = function () {
    setupTimer("YO", timerDisplayYO, startButtonYO, resetButtonYO, addButtonYO, subButtonYO, customButtonYO, timerContainerYO, openButtonYO, yoSTMin, yoSTSec, minInputYO, secInputYO);
    setupTimer("OP", timerDisplayOP, startButtonOP, resetButtonOP, addButtonOP, subButtonOP, customButtonOP, timerContainerOP, openButtonOP, opSTMin, opSTSec, minInputOP, secInputOP);
    setupTimer("RB", timerDisplayRB, startButtonRB, resetButtonRB, addButtonRB, subButtonRB, customButtonRB, timerContainerRB, openButtonRB, rbSTMin, rbSTSec, minInputRB, secInputRB);
    setupTimer("UA", timerDisplayUA, startButtonUA, resetButtonUA, addButtonUA, subButtonUA, customButtonUA, timerContainerUA, openButtonUA, uaSTMin, uaSTSec, minInputUA, secInputUA);
    setupTimer("GA", timerDisplayGA, startButtonGA, resetButtonGA, addButtonGA, subButtonGA, customButtonGA, timerContainerGA, openButtonGA, gaSTMin, gaSTSec, minInputGA, secInputGA);
    setupTimer("DM", timerDisplayDM, startButtonDM, resetButtonDM, addButtonDM, subButtonDM, customButtonDM, timerContainerDM, openButtonDM, dmSTMin, dmSTSec, minInputDM, secInputDM);
};