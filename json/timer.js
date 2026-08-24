/*
NAKLWILSON TOURNEY TIMER (C) 2026
-- INDEX --
1A - GAME CONFIGURATION
2A - SOUND FUNCTIONS
    2B - SOUND EFFECT LIBRARY
    2C - MUTE TOGGLE FUNCTION
    2D - RESET ALARM FUNCTION
    2E - PLAY SELECTED SOUND FUNCTION
    2F - PLAY SPECIFIC SOUND FUNCTION
    2G - MUTE ALL SOUNDS FUNCTION
3A - NAVIGATION FUNCTIONS
    3B - THEME FUNCTION
    3C - TOGGLE BUTTON FUNCTION
    3D - SECONDARY BUTTON FUNCTION
    3E - THEME TOGGLE
    3F - ACTION BUTTON BEHAVIORS
    3G - NAVIGATION BAR BY SCREEN SIZE
4A - COPYRIGHT YEAR
5A - TIMER TEMPLATE
    5B - CUSTOM INCREMENT TIME FUNCTION
6A - GAME TIMER
    6B - TIMER BUTTONS AND ELEMENTS 
    6C - BIND EVENT LISTENERS
    6D - WORKER TICK AND ALARM HANDLING
    6E - +5 MIN BUTTON
    6F - -5 MIN BUTTON
    6G - CUSTOM TIMER BUTTON
    6H - FULLSCREEN STATUS
    6I - VISUAL TIME UPDATE
    6J - TIMER START
    6K - TIMER STOP
    6L - TIMER RESET
    6M - TIME RENDER
    6N - BROWSER NOTIFICATION
7A - VERSION NOTES
    7B - DATE FORMATTING FUNCTION
    7C - ENTRY RENDER FUNCTION
    7D - VERSION NOTES BUTTON FUNCTION
    7E - PAST ENTRY BUTTON
    7F - RECENT ENTRY BUTTON
    7G - REPORT BUTTON
*/

// GAME CONFIGURATION - 1A
const gameConfigs = [
    { id: 'yo', title: 'yugioh', defaultMin: 50, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/yugioh_icon.webp' },
    { id: 'op', title: 'onepiece', defaultMin: 30, defaultSec: 0, overTime: 5, otOn: 'off', icon: './images/tcg_timer/onepiece_icon.webp' },
    { id: 'rb', title: 'riftbound', defaultMin: 60, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/riftbound_icon.webp' },
    { id: 'ua', title: 'unionarena', defaultMin: 30, defaultSec: 0, overTime: 5, otOn: 'off', icon: './images/tcg_timer/unionarena_icon.webp' },
    { id: 'ga', title: 'grandarchive', defaultMin: 60, defaultSec: 0, overTime: 5, otOn: 'off', icon: './images/tcg_timer/grandarchive_icon.webp' },
    { id: 'dm', title: 'digimon', defaultMin: 45, defaultSec: 0, overTime: 5, otOn: 'off', icon: './images/tcg_timer/digimon_icon.webp' },
    { id: 'ws', title: 'weissschwarz', defaultMin: 30, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/weissschwarz_icon.webp' },
    { id: 'dbs', title: 'dragonballsuperfusion', defaultMin: 35, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/dragonballsuperfusion_icon.webp' },
    { id: 'fb', title: 'fleshandblood', defaultMin: 55, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/fleshandblood_icon.webp' },
    { id: 'lc', title: 'lorcana', defaultMin: 50, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/lorcana_icon.webp' },
    { id: 'gm', title: 'gundam', defaultMin: 30, defaultSec: 0, overTime: 5, otOn: 'off', icon: './images/tcg_timer/gundam_icon.webp' },
    { id: 'mg', title: 'magicthegathering', defaultMin: 50, defaultSec: 0, otOn: 'off', icon: './images/tcg_timer/magicthegathering_icon.webp' },
    { id: 'pk', title: 'pokemon', defaultMin: 50, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/pokemon_icon.webp' },
    { id: 'ff', title: 'finalfantasy', defaultMin: 30, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/finalfantasy_icon.webp' },
    { id: 'pw', title: 'palworld', defaultMin: 30, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/palworld_icon.webp' }

];

document.addEventListener('touchstart', (evt) => { });

// SOUND FUNCTIONS - 2A
// Alarm and Sound Effects Library - 2B
const soundLibrary = {
    siren: new Audio('./music/tcg_timer/siren.flac'),
    alarm1: new Audio('./music/tcg_timer/alarm.flac'),
    alarm2: new Audio('./music/tcg_timer/alarm2.flac'),
    countdown6: new Audio('./music/tcg_timer/countdown6.flac'),
    onepiece: new Audio('./music/tcg_timer/onepiece.flac'),
    yugioh: new Audio('./music/tcg_timer/yugioh_life_points.mp3'),
    gundam: new Audio('./music/tcg_timer/mobile-suit-gundam.mp3'),
    finalfantasy: new Audio('./music/tcg_timer/finalfantasy_victory.flac'),
    dragonball: new Audio('./music/tcg_timer/dragonball_gameover.flac')
};

const muteState = {};

// function to mute specific timers - 2C
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

// Reset alarm selection on page load -2D
document.addEventListener('DOMContentLoaded', () => {
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.selectedIndex = 0;
    });
});

// function to play alarm slected by dropdown - 2E
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

// function to play specific sounds - 2F
function playSound(name, targetId) {
    if (targetId && muteState[targetId]) return;

    stopAllSounds();

    const audio = soundLibrary[name];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(err => console.log(`Playback failed for ${name}:`, err));
}

// function to mute sounds - 2G
function stopAllSounds() {
    Object.values(soundLibrary).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}


// NAVIGATION SETTINGS - 3A
document.addEventListener("DOMContentLoaded", () => {

    // Theme Function - 3B
    const root = document.documentElement;
    const themeLogo = document.querySelector(".logo-button-theme");

    function updateThemeLogo(theme) {
        if (themeLogo) {
            themeLogo.src = theme === "dark"
                ? "./images/tcg_timer/ui/light.webp"
                : "./images/tcg_timer/ui/dark.webp";
        }
    }

    const storedTheme = localStorage.getItem("theme") || "dark";
    root.classList.remove("light", "dark");
    root.classList.add(storedTheme);
    updateThemeLogo(storedTheme);

    // toggle button function - 3C
    function toggleSection(targetId, buttonId, buttonElement) {
        if (buttonId === 'nt' || buttonId === 'set' || buttonId === 'ntm' || buttonId === 'setm') {
            const showNt = buttonId === 'nt' || buttonId === 'ntm';

            const ntSection = document.getElementById('timerScreen-nt');
            const setSection = document.getElementById('timerScreen-set');

            const ntButtons = [document.getElementById('nt'), document.getElementById('ntm')];
            const setButtons = [document.getElementById('set'), document.getElementById('setm')];

            const targetSection = showNt ? ntSection : setSection;
            const isAlreadyOpen = targetSection && !targetSection.hasAttribute('hidden');

            if (isAlreadyOpen) {
                targetSection.setAttribute('hidden', '');
                const activeButtons = showNt ? ntButtons : setButtons;
                activeButtons.forEach(btn => {
                    if (btn) btn.classList.remove('active');
                });
                return;
            }

            if (ntSection) ntSection.hidden = !showNt;
            if (setSection) setSection.hidden = showNt;

            ntButtons.forEach(btn => {
                if (btn) btn.classList.toggle('active', showNt);
            });
            setButtons.forEach(btn => {
                if (btn) btn.classList.toggle('active', !showNt);
            });

            return;
        }

        if (!targetId) return;
        const lowerId = targetId.toLowerCase();

        let sectionIdToToggle = null;

        switch (buttonId) {
            case `timerBtn-${lowerId}`: sectionIdToToggle = `customTimer-${lowerId}`; break;
            case `alarmBtn-${lowerId}`: sectionIdToToggle = `soundTimer-${targetId}`; break;
            case 'aboutBtn': sectionIdToToggle = 'about'; break;
            case 'updateBtn': sectionIdToToggle = 'update'; break;
            case 'infoBtn': sectionIdToToggle = 'info'; break;
            default: sectionIdToToggle = `timerScreen-${targetId}`; break;
        }

        if (buttonId === `alarmBtn-${lowerId}`) {
            const timerSection = document.getElementById(`customTimer-${lowerId}`);
            if (timerSection && !timerSection.hasAttribute('hidden')) {
                timerSection.setAttribute('hidden', '');
                const alarmBtn = document.getElementById(`timerBtn-${lowerId}`);
                if (alarmBtn) alarmBtn.classList.remove('active');
            }
        }

        if (buttonId === `timerBtn-${lowerId}`) {
            const soundSection = document.getElementById(`soundTimer-${lowerId}`);
            if (soundSection && !soundSection.hasAttribute('hidden')) {
                soundSection.setAttribute('hidden', '');
                const timerBtn = document.getElementById(`alarmBtn-${lowerId}`);
                if (timerBtn) timerBtn.classList.remove('active');
            }
        }

        if (buttonId === 'infoBtn') {
            const upSection = document.getElementById('update');
            const abSection = document.getElementById('about');
            if (upSection && !upSection.hasAttribute('hidden')) {
                upSection.setAttribute('hidden', '');
                const upBtn = document.getElementById('updateBtn');
                if (upBtn) upBtn.classList.remove('active');
            }
            if (abSection && !abSection.hasAttribute('hidden')) {
                abSection.setAttribute('hidden', '');
                const abBtn = document.getElementById('aboutBtn');
                if (abBtn) abBtn.classList.remove('active');
            }
        }

        if (buttonId === 'updateBtn') {
            const inSection = document.getElementById('info');
            const abSection = document.getElementById('about');
            if (inSection && !inSection.hasAttribute('hidden')) {
                inSection.setAttribute('hidden', '');
                const inBtn = document.getElementById('infoBtn');
                if (inBtn) inBtn.classList.remove('active');
            }
            if (abSection && !abSection.hasAttribute('hidden')) {
                abSection.setAttribute('hidden', '');
                const abBtn = document.getElementById('aboutBtn');
                if (abBtn) abBtn.classList.remove('active');
            }
        }

        if (buttonId === 'aboutBtn') {
            const upSection = document.getElementById('update');
            const inSection = document.getElementById('info');
            if (inSection && !inSection.hasAttribute('hidden')) {
                inSection.setAttribute('hidden', '');
                const inBtn = document.getElementById('infoBtn');
                if (inBtn) inBtn.classList.remove('active');
            }
            if (upSection && !upSection.hasAttribute('hidden')) {
                upSection.setAttribute('hidden', '');
                const upBtn = document.getElementById('updateBtn');
                if (upBtn) upBtn.classList.remove('active');
            }
        }

        if (sectionIdToToggle) {
            const targetSection = document.getElementById(sectionIdToToggle);
            if (targetSection) targetSection.toggleAttribute('hidden');
        }

        if (buttonElement) {
            buttonElement.classList.toggle('active');
        }
    }

    // secondary button function - 3D
    document.addEventListener("click", (event) => {
        const btn = event.target.closest('[data-action], #theme');

        if (!btn) return;

        const action = btn.dataset.action;
        const buttonId = btn.id;

        // Theme Toggle - 3E
        if (buttonId === "theme") {
            const isDark = root.classList.contains("dark");
            const newTheme = isDark ? "light" : "dark";

            root.classList.remove("light", "dark");
            root.classList.add(newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeLogo(newTheme);
            return;
        }

        // Action Behaviors -3F
        switch (action) {
            case 'toggle': {
                const targetId = btn.dataset.target || '';
                toggleSection(targetId, buttonId, btn);
                break;
            }

            case 'choose-timer': {
                const selectId = btn.dataset.select || 'timerSelection';
                const selectElement = document.getElementById(selectId);

                if (!selectElement) {
                    console.error(`Element with ID "${selectId}" not found.`);
                    return;
                }

                const selectedValue = selectElement.value;
                if (!selectedValue) {
                    alert('Please select a game timer from the dropdown first!');
                    return;
                }

                const selectedOption = selectElement.querySelector(`option[value="${selectedValue}"]`);
                if (selectedOption) {
                    selectedOption.hidden = true;
                    selectedOption.disabled = true;
                }
                selectElement.selectedIndex = 0;

                const noTimerScreen = document.getElementById('timerScreen-nt');
                if (noTimerScreen) noTimerScreen.setAttribute('hidden', '');

                const ntBtn = document.getElementById('nt');
                if (ntBtn) ntBtn.classList.toggle('active');

                const selectedButton = document.getElementById(selectedValue);
                if (selectedButton) selectedButton.removeAttribute('hidden');

                toggleSection(selectedValue, buttonId, btn);
                btn.classList.toggle('active');
                break;
            }

            case 'close-timer': {
                const visibleScreens = document.querySelectorAll('[id^="timerScreen-"]:not([hidden])');
                const selectElement = document.getElementById('timerSelection');

                visibleScreens.forEach((screen) => {
                    const targetId = screen.id.replace('timerScreen-', '');
                    if (targetId === 'nt' || targetId === 'set') return;

                    if (selectElement) {
                        const optionToRestore = selectElement.querySelector(`option[value="${targetId}"]`);
                        if (optionToRestore) {
                            optionToRestore.hidden = false;
                            optionToRestore.disabled = false;
                        }
                    }

                    const associatedButton = document.getElementById(targetId) || document.getElementById(`timerBtn-${targetId}`);
                    if (associatedButton) {
                        associatedButton.setAttribute('hidden', '');
                        associatedButton.classList.remove('active');
                    }

                    toggleSection(targetId, associatedButton?.id, associatedButton);

                    const resetBtn = screen.querySelector('.resetBtn') || document.querySelector(`#resetBtn-${targetId}`);
                    if (resetBtn) {
                        resetBtn.click();
                    } else if (typeof updateTimerDisplay === 'function') {
                        updateTimerDisplay('reset');
                    }
                });
                break;
            }
        }
    });

});

const mobileNav = document.getElementById('mobile-navbar');
const normalNav = document.getElementById('normal-navbar');

// navigation bar by screen size - 3G
const mediaQuery = window.matchMedia('(max-width: 780px)');

function handleNavVisibility(e) {
    if (e.matches) {
        // Screen is smaller than 780px
        mobileNav.removeAttribute('hidden');
        normalNav.setAttribute('hidden', '');
    } else {
        // Screen is larger than 780px
        mobileNav.setAttribute('hidden', '');
        normalNav.removeAttribute('hidden');
    }
}

handleNavVisibility(mediaQuery);

mediaQuery.addEventListener('change', handleNavVisibility);
;

// COPYRIGHT YEAR - 4A
const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

// TIMER TEMPLATE - 5A
function createTimerHTML(config) {
    return `
<section id="timerScreen-${config.id}" class="no-select timerScreen-card" hidden>
                    <img class="logo" src="./images/tcg_timer/${config.title}.webp">
                    <div id="timerDisplay-${config.id}" class="timerDisplay">
                        <h1 id="time-${config.id}" class="time">
                        ${String(config.defaultMin).padStart(2, '0')}:${String(config.defaultSec).padStart(2, '0')}
                        </h1>
                    </div>
                    <div id="button-container">
                        <button id="startBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/start.webp"
                                    alt="start" aria-label="Start ${config.title}"></picture>
                        </button>
                        <button id="stopBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/stop.webp"
                                    alt="start" aria-label="Stop ${config.title}"></picture>
                        </button>
                        <button id="resetBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/reset.webp"
                                    alt="reset" aria-label="Reset ${config.title}"></picture>
                        </button>
                                                <button id="openBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/chromecast.webp"
                                    alt="open">
                        </button>
                        <button id="addBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/add.webp"
                                    alt="add"></picture>
                        </button>
                        <button id="subBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/sub.webp"
                                    alt="sub"></picture>
                        </button>
                        <button id="timerBtn-${config.id}" class="button" data-action="toggle" data-target="${config.id}">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/custom.webp"
                                    alt="custom"></picture>
                        </button>
                        <button id="alarmBtn-${config.id}" class="button" data-action="toggle" data-target="${config.id}">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/alarm.webp"
                                    alt="alarm"></picture>
                        </button>
                    </div>
                        <div class="timer-input-container" id="customTimer-${config.id}" hidden>
                            <div class="area increment-area">
                                <div class="input-group">
                                    <label for="custom-increments-${config.id}">
                                        <h2>Increment Amount</h2>
                                                   <center> <input
                                                                type="text"
                                                                id="numberIncrement-${config.id}"
                                                                inputmode="numeric"
                                                                pattern="\\d*"
                                                                value="00:01"
                                                                aria-label="Time in minutes and seconds"
                                                                class="incinput"
                                                            >
                                                            <input type="range" id="rangeIncrement-${config.id}" min="0" max="300" value="59" step="5" class="incrange">
                                                    </center>
                                </div>
                            </div>
                            <div class="area customtimer-area">
                                <div class="input-group">
                                    <label for="custom-timer-${config.id}">
                                        <h2>Custom Timer</h2>
                                                   <center> <input
                                                                type="text"
                                                                id="numberCustom-${config.id}"
                                                                inputmode="numeric"
                                                                pattern="\\d*"
                                                                value="00:01"
                                                                aria-label="Time in minutes and seconds"
                                                                class="incinput"
                                                            >
                                                            <input type="range" id="rangeCustom-${config.id}" min="0" max="18000" value="69" step="5" class="incrange">
                                                    </center>
                                 </div>
                                <div class="customTimer-lock">
                                 <center>
                                 <label for="lockCustom-${config.id}" style="color: var(--text-color);" class="custom-lock">
                                    <input id="lockCustom-${config.id}" type="checkbox" name="lockCustom-${config.id}" role="switch">
                                        <span class="switch"></span>
                                        <span class="text">Lock-in Custom Time</span>
                                </label>
                                </center>
                                </div>
                            </div>
                                                        <div class="area overtime-area">
                                <div class="input-group">
                                    <label for="overtime-${config.id}">
                                        <h2>Overtime Timer</h2>
                                                   <center> <input
                                                                type="text"
                                                                id="numberOvertime-${config.id}"
                                                                inputmode="numeric"
                                                                pattern="\\d*"
                                                                value="00:01"
                                                                aria-label="Time in minutes and seconds"
                                                                class="incinput"
                                                            >
                                                            <input type="range" id="rangeOvertime-${config.id}" min="0" max="18000" value="69" step="5" class="incrange">
                                                    </center>
                                 </div>
                                <div class="overtime-enable">
                                 <center>                                        
                                    <label for="overtimerActive-${config.id}" style="color: var(--text-color);" class="custom-lock">
                                    <input id="overtimerActive-${config.id}" type="checkbox" name="overtimerActive-${config.id}" role="switch">
                                        <span class="switch"></span>
                                        <span class="text">Overtime Enabled</span>
                                </label>
                                </center>
                                </div>
                            </div>
                        </div>
                    <div class="sound-select-container" id="soundTimer-${config.id}" hidden>
                        <div class="area alarm-area"><label for="soundSelect">
                            <h2>Choose an alarm:</h2>
                        </label>
                        <select id="soundSelect-${config.id}">
                            <option value="alarm1" disabled selected value>-- Select an alarm --</option>
                            <option value="alarm1">Alarm 1</option>
                            <option value="alarm2">Alarm 2</option>
                            <option value="siren">Siren</option>
                            <option value="onepiece">One Piece</option>
                            <option value="yugioh">YuGiOh!</option>
                            <option value="gundam">Gundam</option>
                            <option value="finalfantasy">Final Fantasy</option>
                            <option value="dragonball">Dragonball</option>
                        </select>
                        <div class="button-alarm">
                            <button id="previewBtn-${config.id}" class="button" onclick="playSelectedSound('${config.id}')">
                                <picture class="ui-picture"> <img class="ui-button"
                                        src="./images/tcg_timer/ui/test.webp" alt="preview"></picture>
                            </button>
                            <button id="muteBtn-${config.id}" class="button" onclick="toggleMute('${config.id}')">
                                <picture class="ui-picture">
                                    <img class="ui-button" src="./images/tcg_timer/ui/unmute.webp" alt="unmute">
                                </picture>
                            </button>
                        </div>
            </section>
  `;
}

const container = document.getElementById('timer-container');
container.innerHTML = gameConfigs.map(config => createTimerHTML(config)).join('');

// custom increment amount function - 5B
function secondsToTimeString(totalSeconds, min = 1, max = 300) {
    const s = Math.max(min, Math.min(max, Math.round(totalSeconds)));
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
}

// Convert "MM:SS" or raw digit string -> total seconds (number)
function parseTimeString(value) {
    const cleaned = value.replace(/[^\d:]/g, '');

    let minutes = 0;
    let seconds = 0;

    if (cleaned.includes(':')) {
        const parts = cleaned.split(':');
        minutes = parseInt(parts[0], 10) || 0;
        seconds = parseInt(parts[1], 10) || 0;
    } else if (cleaned.length > 0) {
        const num = parseInt(cleaned, 10) || 0;
        if (cleaned.length <= 2) {
            minutes = 0;
            seconds = num;
        } else {
            seconds = num % 100;
            minutes = Math.floor(num / 100);
        }
    }

    return (minutes * 60) + seconds;
}

function initRangeTimeSync(config) {
    const range = document.getElementById(`rangeIncrement-${config.id}`);
    const numberBox = document.getElementById(`numberIncrement-${config.id}`);

    if (!range || !numberBox) {
        console.warn(`initRangeTimeSync: could not find elements for targetId "${config.id}"`);
        return;
    }

    function updateNumberBoxFromRange() {
        numberBox.value = secondsToTimeString(range.value);
    }

    function updateRangeFromNumberBox() {
        const totalSeconds = parseTimeString(numberBox.value);
        const clamped = Math.max(1, Math.min(300, totalSeconds || 1));
        range.value = clamped;
        numberBox.value = secondsToTimeString(clamped);
    }

    range.addEventListener('input', updateNumberBoxFromRange);

    numberBox.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            updateRangeFromNumberBox();
            numberBox.blur();
        }
    });

    numberBox.addEventListener('blur', updateRangeFromNumberBox);

    updateNumberBoxFromRange();
}

gameConfigs.forEach(config => initRangeTimeSync(config));

// GAME TIMER - 6A
class GameTimer {
    constructor(config) {
        this.bc = new BroadcastChannel('tcg_timer_channel');
        this.config = config;
        this.durationMs = ((config.defaultMin * 60) + config.defaultSec) * 1000;
        this.remainingMs = this.durationMs;
        this.worker = new Worker('./json/timerWorker.js');
        this.isRunning = false;
        this.overtimeM = (config.overTime || 0) * 60;
        this.otOn = config.otOn || 'off';

        // Timer buttons and elements -6B    
        this.displayElement = document.getElementById(`time-${config.id}`);
        this.startbutton = document.getElementById(`startBtn-${config.id}`);
        this.stopbutton = document.getElementById(`stopBtn-${config.id}`);
        this.resetbutton = document.getElementById(`resetBtn-${config.id}`);
        this.openbutton = document.getElementById(`openBtn-${config.id}`);
        this.addbutton = document.getElementById(`addBtn-${config.id}`);
        this.subbutton = document.getElementById(`subBtn-${config.id}`);
        this.alarmbutton = document.getElementById(`alarmBtn-${config.id}`);
        this.timerElement = document.getElementById(`timerDisplay-${config.id}`);
        this.timeElement = document.getElementById(`time-${config.id}`);
        this.customOt = document.getElementById(`customOt-${config.id}`);
        this.overtimeButton = document.getElementById(`overBtn-${config.id}`);
        this.customIncrement = document.getElementById(`numberIncrement-${config.id}`);
        this.notifications = document.getElementById(`notification-checkbox-set`);

        GameTimer.initNotificationPermissionRequest(this.notifications);

        // Bind event listeners - 6C
        this.startbutton.addEventListener('click', () => this.start());
        this.stopbutton.addEventListener('click', () => this.stop());
        this.resetbutton.addEventListener('click', () => this.reset());

        // Worker Tick and Alarm handling - 6D
        this.worker.onmessage = (e) => {
            const { type, remaining } = e.data;

            if (type === 'tick') {
                this.remainingMs = remaining;
                this.renderTime(Math.ceil(remaining / 1000));
                this.broadcastState('running');
            } else if (type === 'alarm') {
                console.log(`${this.config.title} timer finished!`);
                stopAllSounds();
                playSelectedSound(this.config.id);

                // Notification push based on checkbox value
                if (this.notifications.checked &&
                    'Notification' in window &&
                    Notification.permission === 'granted' &&
                    document.hidden) {
                    const n = new Notification(`${this.config.title} timer finished!`, {
                        body: 'Call the Match!',
                        tag: `tcg-timer-${this.config.id}`,
                        icon: this.config.icon,
                        requireInteraction: true
                    });
                    n.onclick = () => {
                        window.focus();
                        n.close();
                    };
                }

                if (this.maybeStartOvertime()) {
                    return;
                }

                this.remainingMs = 0;
                this.isRunning = false;
                this.renderTime(0);
                this.broadcastState('stopped');
                this.timerElement.setAttribute('is-stopped', '');
                this.timerElement.removeAttribute('is-running');
                this.timeElement.setAttribute('is-stopped', '');
                this.timeElement.removeAttribute('is-running');
            }
        };

        // Increment Button - 6E
        if (this.addbutton) {
            this.addbutton.addEventListener("click", () => {
                const incrementSeconds = parseTimeString(this.customIncrement.value) || 0;
                this.adjustTime(incrementSeconds);
            });
        }

        // Increment Button - 6F
        if (this.subbutton) {
            this.subbutton.addEventListener("click", () => {
                const incrementSeconds = parseTimeString(this.customIncrement.value) || 0;
                this.adjustTime(-incrementSeconds);
            });
        }

        // Custom Timer Button - 6G
        this.rangeCustom = document.getElementById(`rangeCustom-${config.id}`);
        this.numberCustom = document.getElementById(`numberCustom-${config.id}`);
        this.lockCustom = document.getElementById(`lockCustom-${config.id}`);
        this.customSliderLive = true;

        if (this.rangeCustom && this.numberCustom) {
            const rangeMin = Number(this.rangeCustom.min) || 1;
            const rangeMax = Number(this.rangeCustom.max) || 3600;

            const defaultTotalSeconds = (config.defaultMin * 60) + config.defaultSec;
            const initialSeconds = Math.max(rangeMin, Math.min(rangeMax, defaultTotalSeconds));

            this.rangeCustom.value = initialSeconds;
            this.numberCustom.value = secondsToTimeString(initialSeconds, rangeMin, rangeMax);

            const applyCustomDuration = (totalSeconds) => {
                if (this.isRunning) {
                    this.stop();
                }
                this.durationMs = Math.round(totalSeconds) * 1000;
                this.remainingMs = this.durationMs;
            };

            const updateFromRange = () => {
                if (!this.customSliderLive) return;
                const totalSeconds = Math.round(Number(this.rangeCustom.value));
                this.numberCustom.value = secondsToTimeString(totalSeconds, rangeMin, rangeMax);
                this.renderTime(totalSeconds);
            };


            const updateFromNumberBox = () => {
                if (!this.customSliderLive) return;
                const parsed = parseTimeString(this.numberCustom.value);
                const clamped = Math.max(rangeMin, Math.min(rangeMax, parsed || rangeMin));
                this.rangeCustom.value = clamped;
                this.numberCustom.value = secondsToTimeString(clamped, rangeMin, rangeMax);
                this.renderTime(clamped);
                applyCustomDuration(clamped);
            };

            this.rangeCustom.addEventListener('input', updateFromRange);


            this.rangeCustom.addEventListener('change', () => {
                if (!this.customSliderLive) return;
                applyCustomDuration(Number(this.rangeCustom.value));
            });

            this.numberCustom.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    updateFromNumberBox();
                    this.numberCustom.blur();
                }
            });

            this.numberCustom.addEventListener('blur', updateFromNumberBox);
        }


        this.setupOvertimeSystem(config);

        if (this.openbutton) {
            this.openbutton.addEventListener('click', () => {
                window.open(`timerfs.html?game=${this.config.id}`, '_blank');
                setTimeout(() => {
                    this.broadcastState(this.isRunning ? 'running' : 'stopped');
                }, 500);
            });
        }
        this.renderTime(this.durationMs / 1000);
    }

    // fullscreen status - 6H
    broadcastState(status) {
        if (!this.bc) return;
        this.bc.postMessage({
            type: 'UPDATE',
            game: this.config.id,
            time: this.displayElement.textContent,
            status: status
        });
    }

    // Visual Time Update - 6I
    adjustTime(secondsToChange) {
        const msToChange = secondsToChange * 1000;

        if (this.isRunning) {
            this.remainingMs = Math.max(0, this.remainingMs + msToChange);
            this.renderTime(Math.ceil(this.remainingMs / 1000));
            this.worker.postMessage({ cmd: 'adjust', msToChange });
            this.broadcastState('running');
        } else {
            this.durationMs = Math.round(this.durationMs + msToChange);
            if (this.durationMs < 0) {
                this.durationMs = 0;
            }
            this.remainingMs = this.durationMs;
            this.renderTime(this.durationMs / 1000);
            this.broadcastState('stopped');
        }
    }

    lockCustomSlider() {
        this.customSliderLive = false;
        if (this.rangeCustom) this.rangeCustom.disabled = true;
        if (this.numberCustom) this.numberCustom.disabled = true;
    }

    unlockCustomSlider() {
        this.customSliderLive = true;
        if (this.rangeCustom) this.rangeCustom.disabled = false;
        if (this.numberCustom) this.numberCustom.disabled = false;
    }

    // TIMER START - 6J
    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.worker.postMessage({ cmd: 'start', durationMs: this.remainingMs });
        this.lockCustomSlider();
        this.timerElement.setAttribute('is-running', '');
        this.timerElement.removeAttribute('is-stopped');
        this.timeElement.setAttribute('is-running', '');
        this.timeElement.removeAttribute('is-stopped');
    }
    // TIMER STOP - 6K
    stop() {
        if (!this.isRunning) return;

        this.isRunning = false;
        this.durationMs = this.remainingMs;
        this.worker.postMessage({ cmd: 'stop' });
        this.lockCustomSlider();
        this.broadcastState('stopped');
        this.timerElement.setAttribute('is-stopped', '');
        this.timerElement.removeAttribute('is-running');
        this.timeElement.setAttribute('is-stopped', '');
        this.timeElement.removeAttribute('is-running');
    }

    getResetDurationSeconds() {
        const defaultTotalSeconds = (this.config.defaultMin * 60) + this.config.defaultSec;

        if (this.lockCustom && this.lockCustom.checked && this.rangeCustom) {
            return Math.round(Number(this.rangeCustom.value));
        }

        return defaultTotalSeconds;
    }

    // TIMER RESET - 6L
    reset() {
        this.worker.postMessage({ cmd: 'stop' });
        this.isRunning = false;
        this.unlockCustomSlider();
        this.overtimeUsed = false;
        const resetSeconds = this.getResetDurationSeconds();
        this.durationMs = resetSeconds * 1000;
        this.remainingMs = this.durationMs;
        this.renderTime(this.durationMs / 1000);
        this.broadcastState('reset');
        if (this.timerElement.hasAttribute('is-stopped')) {
            this.timerElement.removeAttribute('is-stopped');
        } else {
            this.timerElement.removeAttribute('is-running');
        }
        if (this.timeElement.hasAttribute('is-stopped')) {
            this.timeElement.removeAttribute('is-stopped');
        } else {
            this.timeElement.removeAttribute('is-running');
        }

        if (this.rangeCustom && this.numberCustom) {
            const rangeMin = Number(this.rangeCustom.min) || 1;
            const rangeMax = Number(this.rangeCustom.max) || 3600;
            const clamped = Math.max(rangeMin, Math.min(rangeMax, resetSeconds));
            this.rangeCustom.value = clamped;
            this.numberCustom.value = secondsToTimeString(clamped, rangeMin, rangeMax);
        }
    }
    // TIME RENDER - 6M
    renderTime(totalSeconds) {
        const safeSeconds = Math.round(totalSeconds);
        const mins = Math.floor(safeSeconds / 60);
        const secs = safeSeconds % 60;
        this.displayElement.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }


    // BROWSER NOTIFICATION - 6N
    static initNotificationPermissionRequest(checkboxEl) {
        if (!checkboxEl || GameTimer._notificationListenerAttached) return;
        GameTimer._notificationListenerAttached = true;

        checkboxEl.addEventListener('change', () => {
            if (checkboxEl.checked && 'Notification' in window && Notification.permission === 'default') {
                document.addEventListener('click', function requestOnce() {
                    Notification.requestPermission();
                    document.removeEventListener('click', requestOnce);
                }, { once: true });
            }
        });
    }

    // OVERTIME SYSTEM
    setupOvertimeSystem(config) {
        this.rangeOvertime = document.getElementById(`rangeOvertime-${config.id}`);
        this.numberOvertime = document.getElementById(`numberOvertime-${config.id}`);
        this.overtimerActive = document.getElementById(`overtimerActive-${config.id}`);

        this.overtimeUsed = false;

        if (this.overtimerActive) {
            this.overtimerActive.checked = (this.otOn === 'on');
        }

        if (!this.rangeOvertime || !this.numberOvertime) return;

        const rangeMin = Number(this.rangeOvertime.min) || 0;
        const rangeMax = Number(this.rangeOvertime.max) || 3600;

        const initialSeconds = Math.max(rangeMin, Math.min(rangeMax, this.overtimeM));
        this.rangeOvertime.value = initialSeconds;
        this.numberOvertime.value = secondsToTimeString(initialSeconds, rangeMin, rangeMax);
        this.overtimeM = initialSeconds;

        const updateFromRange = () => {
            const totalSeconds = Math.round(Number(this.rangeOvertime.value));
            this.overtimeM = totalSeconds;
            this.numberOvertime.value = secondsToTimeString(totalSeconds, rangeMin, rangeMax);
        };

        const updateFromNumberBox = () => {
            const parsed = parseTimeString(this.numberOvertime.value);
            const clamped = Math.max(rangeMin, Math.min(rangeMax, parsed || rangeMin));
            this.rangeOvertime.value = clamped;
            this.numberOvertime.value = secondsToTimeString(clamped, rangeMin, rangeMax);
            this.overtimeM = clamped;
        };

        this.rangeOvertime.addEventListener('input', updateFromRange);

        this.numberOvertime.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                updateFromNumberBox();
                this.numberOvertime.blur();
            }
        });
        this.numberOvertime.addEventListener('blur', updateFromNumberBox);
    }

    maybeStartOvertime() {
        const active = this.overtimerActive && this.overtimerActive.checked;

        if (!active || this.overtimeUsed || !this.overtimeM || this.overtimeM <= 0) {
            return false;
        }

        this.overtimeUsed = true;

        this.durationMs = this.overtimeM * 1000;
        this.remainingMs = this.durationMs;
        this.isRunning = true;
        this.worker.postMessage({ cmd: 'start', durationMs: this.remainingMs });
        this.renderTime(this.overtimeM);
        this.broadcastState('running');

        this.timerElement.setAttribute('is-running', '');
        this.timerElement.removeAttribute('is-stopped');
        this.timeElement.setAttribute('is-running', '');
        this.timeElement.removeAttribute('is-stopped');

        console.log(`${this.config.id} entering overtime: ${this.overtimeM}s`);
        return true;
    }

}

const activeTimers = gameConfigs.map(config => new GameTimer(config));

//VERSION NOTES - 7A
(function () {
    /**
     * Blog entry template:
     *  - version : becomes the title
     *  - date    : becomes the subtitle
     *  - notes   : becomes the description
     */
    const entries = [
        {
            version: "v0.1.0",
            date: "2026-07-25",
            notes: "Initial release."
        },
        {
            version: "v0.14.4",
            date: "2026-08-04",
            notes: "* Altered the Timer code to use a worker function to offset the 4min drift.\n* Overhauled the visuals for various screen sizes\n* Added more details to the settings page\n* Timers ar enow javascript templates\n* Added several new alarm sounds!\n* Fixed an issue with custom timer on mobile"
        },
        {
            version: "v0.15.0",
            date: "2026-08-05",
            notes: "* Updated the Version Notes page! Wowie~!\n* Added even more new alarm sounds!\n* Added Index to settings page for button identification and instructions\n* Timer Worker has been given full dependance on counting to offset 2min drift.\n* Replaced the previous Chromecast button with a much clearer visual cue"
        },
        {
            version: "v0.15.1",
            date: "2026-08-06",
            notes: "* Fixed an issue where the new timer, settings, custom timer and alarm buttons were not removing the 'active' state from their buttons when pressed.\n* Fixed an issue where the new timer and settings cards were not replacing one another. Only one open at a time!\n* Updated the About section, say hi back to him!\n* fixed the report button to redirect to the contact page correctly.\n* Fixed issue where theme button wasn't swapping icons."
        },
        {
            version: "v0.15.2",
            date: "2026-08-08",
            notes: "* Added more icons to the Index section.\n* Fixed an issue where the About, Version, and Index buttons and sections were not working as intended."
        },
        {
            version: "v0.16.0",
            date: "2026-08-11",
            notes: "* Added more icons to the Index section.\n* Added function to select a custom increase and decrease increment amount.\n* Fixed an issue with the Navigation buttons getting stuck.\n* Fixed an issue where theme button required two presses to execute a theme change.\n* Added some information in the about tab for context.\n* Updated the Version Notes design."
        },
        {
            version: "v0.16.1",
            date: "2026-08-12",
            notes: "* Set the new default increment level to be 01:00 minute instead of 00:01 second.\n* Visual overhaul of the custom timer and alarm settings container\n* Fixed an issue where the new timer and settings buttons wouldn't close their respective sections. "
        },
        {
            version: "v0.16.2",
            date: "2026-08-12",
            notes: "* Reworded the About section and added some badges.\n* Added a toggle under settings to turn on/off browser notifications"
        },
        {
            version: "v0.16.3",
            date: "2026-08-13",
            notes: "* Standarization of the Custom Timer settings, slider revolution!\n* Custom Time slider updates the timer in real time\n* Added a checkbox to lock the Custom Time to retain the value after resetting the timer.\n* Custom Timer can no longer be edited once the Start or Pause buttons have been pressed, but the Custom Time can still be locked or edited upon timer reset.\n* Added a picture to the Switch Theme button.\n* Reworked the Theme and Browser notification settings visually."
        },
        {
            version: "v0.17.0",
            date: "2026-08-15",
            notes: "* Added the Overtime system under the Custom Timer Settings.\n* Overtime can only run once per timer reset!\n* Improved the design of the checkboxes."
        },
        {
            version: "v0.17.1",
            date: "2026-08-15",
            notes: "* Removed the Overtime timer from being automatically enabled for some games."
        },
        {
            version: "v0.17.2",
            date: "2026-08-15",
            notes: "* Fixed an issue where non-color variables were not working with the theme switching.\n* Fixed an issue where the favicon for iOS web app shortcuts was not working."
        },
        {
            version: "v0.17.3",
            date: "2026-08-24",
            notes: "* Changed the timer notifcation to display the full name of the game instead of a progromatic shorthand id.\n* Changed the active color for the buttons so that they are more obvious when enabled.\n* Added timer specific notification icons.\n* Minified the javascript. Uncertain why I didn't do this earlier."
        }
    ];

    let currentIndex = entries.length - 1;

    const titleEl = document.getElementById("entry-title");
    const subtitleEl = document.getElementById("entry-subtitle");
    const descriptionEl = document.getElementById("entry-description");
    const peBtn = document.getElementById("PE");
    const reBtn = document.getElementById("RE");
    const reportBtn = document.getElementById("report-btn");

    const REPORT_PAGE_URL = "/contact";
    // DATE FORMATING FUNCTION - 7B
    function formatDate(dateStr) {
        const d = new Date(dateStr + "T00:00:00");
        if (isNaN(d)) return dateStr;
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    // ENTRY RENDER FUNCTION - 7C
    function renderEntry(index) {
        const entry = entries[index];
        titleEl.textContent = entry.version;
        subtitleEl.textContent = formatDate(entry.date);
        descriptionEl.textContent = entry.notes;
        descriptionEl.scrollTop = 0;
        updateControls(index);
    }
    // VERSION NOTES BUTTONS FUNCTION - 7D
    function updateControls(index) {
        const isOldest = index <= 0;
        const isMostRecent = index >= entries.length - 1;

        peBtn.disabled = isOldest;

        reBtn.disabled = isMostRecent;

        reportBtn.disabled = !isMostRecent;
    }
    // PAST ENTRY BUTTON - 7E
    function handlePastEntry() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderEntry(currentIndex);
        }
    }
    // RECENT ENTRY BUTTON - 7F
    function handleRecentEntry() {
        if (currentIndex < entries.length - 1) {
            currentIndex += 1;
            renderEntry(currentIndex);
        }
    }
    // REPORT BUTTON - 7G
    function handleReportNav() {
        if (currentIndex === entries.length - 1) {
            window.location.href = REPORT_PAGE_URL;
        }
    }

    peBtn.addEventListener("click", handlePastEntry);
    reBtn.addEventListener("click", handleRecentEntry);
    reportBtn.addEventListener("click", handleReportNav);

    renderEntry(currentIndex);
})();