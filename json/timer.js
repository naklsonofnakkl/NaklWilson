// 1. Define the configuration for all your games
const gameConfigs = [
    { id: 'yo', title: 'yugioh', defaultMin: 45, defaultSec: 0 },
    { id: 'op', title: 'onepiece', defaultMin: 35, defaultSec: 0 },
    { id: 'rb', title: 'riftbound', defaultMin: 60, defaultSec: 0 },
    { id: 'ua', title: 'unionarena', defaultMin: 30, defaultSec: 0 },
    { id: 'ga', title: 'grandarchive', defaultMin: 60, defaultSec: 0 },
    { id: 'dm', title: 'digimon', defaultMin: 45, defaultSec: 0 },
    { id: 'ws', title: 'weissschwarz', defaultMin: 30, defaultSec: 0 },
    { id: 'dbs', title: 'dragonballsuperfusion', defaultMin: 35, defaultSec: 0 },
    { id: 'fb', title: 'fleshandblood', defaultMin: 55, defaultSec: 0 },
    { id: 'lc', title: 'lorcana', defaultMin: 50, defaultSec: 0 },
    { id: 'gm', title: 'gundam', defaultMin: 30, defaultSec: 0 },
    { id: 'mg', title: 'magicthegathering', defaultMin: 50, defaultSec: 0 },
    { id: 'pk', title: 'pokemon', defaultMin: 50, defaultSec: 0 },
    { id: 'ff', title: 'finalfantasy', defaultMin: 30, defaultSec: 0 },
    { id: 'pw', title: 'palworld', defaultMin: 30, defaultSec: 0 }
    // You can easily add all 15 games here!

];

// SOUND FUNCTIONS
// Alarm and Sound Effects Library
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

// function to mute specific timers
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

// Reset alarm selection on page load
document.addEventListener('DOMContentLoaded', () => {
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.selectedIndex = 0;
    });
});

// function to play alarm slected by dropdown
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

// function to play specific sounds
function playSound(name, targetId) {
    if (targetId && muteState[targetId]) return;

    stopAllSounds();

    const audio = soundLibrary[name];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(err => console.log(`Playback failed for ${name}:`, err));
}

// function to mute sounds
function stopAllSounds() {
    Object.values(soundLibrary).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}



document.addEventListener("DOMContentLoaded", () => {

    // Theme Function
    const root = document.documentElement;
    const themeLogo = document.querySelector(".logo-button-theme");

        function updateThemeLogo(theme) {
        if (themeLogo) {
            themeLogo.src = theme === "dark"
                ? "./images/tcg_timer/ui/light.webp"
                : "./images/tcg_timer/ui/dark.webp";
        }
    }

function toggleSection(targetId, buttonId, buttonElement) {
    if (!targetId) return;
    const lowerId = targetId.toLowerCase();
    let sectionIdToToggle = null;

    switch (buttonId) {
        case `timerBtn-${lowerId}`: sectionIdToToggle = `customTimer-${lowerId}`; break;
        case `alarmBtn-${lowerId}`: sectionIdToToggle = `soundTimer-${targetId}`; break;
        case 'aboutBtn': sectionIdToToggle = 'about'; break;
        case 'updateBtn': sectionIdToToggle = 'update'; break;
        case 'infoBtn': sectionIdToToggle = 'info'; break;
        case 'nt': sectionIdToToggle = `timerScreen-${targetId}`; break;
        case 'set': sectionIdToToggle = `timerScreen-${targetId}`; break;
        default: sectionIdToToggle = `timerScreen-${targetId}`; break;
    }

    if (buttonId === `alarmBtn-${lowerId}`) {
        const timerSection = document.getElementById(`customTimer-${lowerId}`);
        if (timerSection && !timerSection.hasAttribute('hidden')) {
            timerSection.setAttribute('hidden', '');
        }
    }

    if (buttonId === `timerBtn-${lowerId}`) {
        const soundSection = document.getElementById(`soundTimer-${lowerId}`);
        if (soundSection && !soundSection.hasAttribute('hidden')) {
            soundSection.setAttribute('hidden', '');
        }
    }

    if (buttonId === 'nt') {
        const setSection = document.getElementById('timerScreen-set');
        if (setSection && !setSection.hasAttribute('hidden')) {
            setSection.setAttribute('hidden', '');
            const setBtn = document.getElementById('set');
            if (setBtn) setBtn.classList.remove('active');
        }
    }

    if (buttonId === 'set') {
        const ntSection = document.getElementById('timerScreen-nt');
        if (ntSection && !ntSection.hasAttribute('hidden')) {
            ntSection.setAttribute('hidden', '');
            const ntBtn = document.getElementById('nt');
            if (ntBtn) ntBtn.classList.remove('active');
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

    document.addEventListener("click", (event) => {
        const btn = event.target.closest('[data-action], #theme');

        if (!btn) return;

        const action = btn.dataset.action;
        const buttonId = btn.id;

        // Theme Toggle
        if (buttonId === "theme") {
            const isDark = root.classList.contains("dark");
            const newTheme = isDark ? "light" : "dark";

            root.classList.remove("light", "dark");
            root.classList.add(newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeLogo(newTheme);
            return;
        }

        // Action Behaviors
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

// Define max-screen size
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

// COPYRIGHT YEAR
const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

// TIMER TEMPLATE
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
                                    alt="start" aria-label="Start ${config.title}">
                        </button>
                        <button id="stopBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/stop.webp"
                                    alt="start" aria-label="Stop ${config.title}">
                        </button>
                        <button id="resetBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/reset.webp"
                                    alt="reset" aria-label="Reset ${config.title}">
                        </button>
                                                <button id="openBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/chromecast.webp"
                                    alt="open">
                        </button>
                        <button id="addBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/add.webp"
                                    alt="add">
                        </button>
                        <button id="subBtn-${config.id}" class="button">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/sub.webp"
                                    alt="sub">
                        </button>
                        <button id="timerBtn-${config.id}" class="button" data-action="toggle" data-target="${config.id}">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/custom.webp"
                                    alt="custom">
                        </button>
                        <button id="alarmBtn-${config.id}" class="button" data-action="toggle" data-target="${config.id}">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/alarm.webp"
                                    alt="alarm">
                        </button>
                    </div>
                    <div class="timer-input-container" id="customTimer-${config.id}" hidden>
                        <div class="input-group">
                            <label for="custom-minutes-${config.id}">
                                <h2>Minutes</h2>
                            </label>
                            <input type="number" pattern="\\d*" id="custom-minutes-${config.id}" min="0" max="999"
                                placeholder="00" />
                        </div>
                        <div class="input-group">
                            <label for="custom-seconds-${config.id}">
                                <h2>Seconds</h2>
                            </label>
                            <input type="number" pattern="\\d*" id="custom-seconds-${config.id}" min="0" max="59"
                                placeholder="00" />
                        </div>
                        <div class="button-space">
                            <button type="button" id="customBtn-${config.id}" class="button">
                                <picture class="ui-picture"> <img class="ui-button"
                                        src="./images/tcg_timer/ui/confirm.webp" alt="confirm">
                            </button>
                        </div>
                    </div>
                    <div class="sound-select-container" id="soundTimer-${config.id}" hidden>
                        <label for="soundSelect">
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
                                        src="./images/tcg_timer/ui/test.webp" alt="preview">
                            </button>
                            <button id="muteBtn-${config.id}" class="button" onclick="toggleMute('${config.id}')">
                                <picture class="ui-picture">
                                    <img class="ui-button" src="./images/tcg_timer/ui/unmute.webp" alt="unmute">
                                </picture>
                            </button>
                        </div>
                    </div>
            </section>
  `;
}

const container = document.getElementById('timer-container');
container.innerHTML = gameConfigs.map(config => createTimerHTML(config)).join('');


// GAME TIMER
class GameTimer {
    constructor(config) {
        this.bc = new BroadcastChannel('tcg_timer_channel');
        this.config = config;
        this.durationMs = ((config.defaultMin * 60) + config.defaultSec) * 1000;
        this.remainingMs = this.durationMs;
        this.worker = new Worker('./json/timerWorker.js');
        this.isRunning = false;

        this.displayElement = document.getElementById(`time-${config.id}`);
        this.startbutton = document.getElementById(`startBtn-${config.id}`);
        this.stopbutton = document.getElementById(`stopBtn-${config.id}`);
        this.resetbutton = document.getElementById(`resetBtn-${config.id}`);
        this.openbutton = document.getElementById(`openBtn-${config.id}`);
        this.addbutton = document.getElementById(`addBtn-${config.id}`);
        this.subbutton = document.getElementById(`subBtn-${config.id}`);
        this.timerbutton = document.getElementById(`customBtn-${config.id}`);
        this.alarmbutton = document.getElementById(`alarmBtn-${config.id}`);
        this.custommin = document.getElementById(`custom-minutes-${config.id}`);
        this.customsec = document.getElementById(`custom-seconds-${config.id}`);
        this.timerElement = document.getElementById(`timerDisplay-${config.id}`);
        this.timeElement = document.getElementById(`time-${config.id}`);

        // Bind event listeners
        this.startbutton.addEventListener('click', () => this.start());
        this.stopbutton.addEventListener('click', () => this.stop());
        this.resetbutton.addEventListener('click', () => this.reset());

        // Worker now owns remaining-time tracking and the alarm decision,
        // so ticks and the alarm are handled as distinct message types.
        this.worker.onmessage = (e) => {
            const { type, remaining } = e.data;

            if (type === 'tick') {
                this.remainingMs = remaining;
                this.renderTime(Math.ceil(remaining / 1000));
                this.broadcastState('running');
            } else if (type === 'alarm') {
                this.remainingMs = 0;
                this.isRunning = false;
                this.renderTime(0);
                this.broadcastState('stopped');
                this.timerElement.setAttribute('is-stopped', '');
                this.timerElement.removeAttribute('is-running');
                this.timeElement.setAttribute('is-stopped', '');
                this.timeElement.removeAttribute('is-running');

                console.log(`${this.config.id} timer finished!`);
                stopAllSounds();
                playSelectedSound(this.config.id);

                if ('Notification' in window && Notification.permission === 'granted' && document.hidden) {
                    const n = new Notification(`${this.config.id} timer finished!`, {
                        body: 'Time is up.',
                        tag: `tcg-timer-${this.config.id}`,
                        requireInteraction: true
                    });
                    n.onclick = () => {
                        window.focus();
                        n.close();
                    };
                }
            }
        };

        // +5 Minutes Button
        if (this.addbutton) {
            this.addbutton.addEventListener("click", () => {
                this.adjustTime(5);
            });
        }

        // -5 Minutes Button
        if (this.subbutton) {
            this.subbutton.addEventListener("click", () => {
                this.adjustTime(-5);
            });
        }

        // Custom Timer Button
        if (this.timerbutton && this.custommin && this.customsec) {
            this.timerbutton.addEventListener("click", () => {
                const minInt = parseInt(this.custommin.value, 10) || 0;
                const secInt = parseInt(this.customsec.value, 10) || 0;

                this.custommin.value = '';
                this.customsec.value = '';
                if (this.isRunning) {
                    this.stop();
                }
                this.durationMs = ((minInt * 60) + secInt) * 1000;
                this.remainingMs = this.durationMs;
                this.renderTime(this.durationMs / 1000);
            });
        }

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

    broadcastState(status) {
        if (!this.bc) return;
        this.bc.postMessage({
            type: 'UPDATE',
            game: this.config.id,
            time: this.displayElement.textContent,
            status: status
        });
    }

    adjustTime(minutesToChange) {
        const msToChange = minutesToChange * 60 * 1000;

        if (this.isRunning) {
            // Optimistic local update so the display responds instantly;
            // the worker's own endTime is adjusted too, so future ticks stay in sync.
            this.remainingMs = Math.max(0, this.remainingMs + msToChange);
            this.renderTime(Math.ceil(this.remainingMs / 1000));
            this.worker.postMessage({ cmd: 'adjust', msToChange });
            this.broadcastState('running');
        } else {
            this.durationMs += msToChange;
            if (this.durationMs < 0) {
                this.durationMs = 0;
            }
            this.remainingMs = this.durationMs;
            this.renderTime(this.durationMs / 1000);
            this.broadcastState('stopped');
        }
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.worker.postMessage({ cmd: 'start', durationMs: this.remainingMs });
        this.timerElement.setAttribute('is-running', '');
        this.timerElement.removeAttribute('is-stopped');
        this.timeElement.setAttribute('is-running', '');
        this.timeElement.removeAttribute('is-stopped');
    }

    stop() {
        if (!this.isRunning) return;

        this.isRunning = false;
        this.durationMs = this.remainingMs; // preserve where it left off for the next start()
        this.worker.postMessage({ cmd: 'stop' });
        this.broadcastState('stopped');
        this.timerElement.setAttribute('is-stopped', '');
        this.timerElement.removeAttribute('is-running');
        this.timeElement.setAttribute('is-stopped', '');
        this.timeElement.removeAttribute('is-running');
    }

    reset() {
        this.worker.postMessage({ cmd: 'stop' });
        this.isRunning = false;
        this.durationMs = ((this.config.defaultMin * 60) + this.config.defaultSec) * 1000;
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
    }

    renderTime(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        this.displayElement.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
}

if ('Notification' in window && Notification.permission === 'default') {
    document.addEventListener('click', function requestOnce() {
        Notification.requestPermission();
        document.removeEventListener('click', requestOnce);
    }, { once: true });
}

const activeTimers = gameConfigs.map(config => new GameTimer(config));

//VERSION NOTES
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

    function formatDate(dateStr) {
        const d = new Date(dateStr + "T00:00:00");
        if (isNaN(d)) return dateStr;
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    function renderEntry(index) {
        const entry = entries[index];
        titleEl.textContent = entry.version;
        subtitleEl.textContent = formatDate(entry.date);
        descriptionEl.textContent = entry.notes;
        descriptionEl.scrollTop = 0;
        updateControls(index);
    }

    function updateControls(index) {
        const isOldest = index <= 0;
        const isMostRecent = index >= entries.length - 1;

        peBtn.disabled = isOldest;

        reBtn.disabled = isMostRecent;

        reportBtn.disabled = !isMostRecent;
    }

    function handlePastEntry() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderEntry(currentIndex);
        }
    }

    function handleRecentEntry() {
        if (currentIndex < entries.length - 1) {
            currentIndex += 1;
            renderEntry(currentIndex);
        }
    }

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