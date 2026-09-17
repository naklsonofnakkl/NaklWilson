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
    6O - OVERTIME SYSTEM
    6P - TAB STATUS
    6Q - FULL RESET TO DEFAULTS
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
    { id: 'yo', title: 'YuGiOh!', defaultMin: 50, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/yugioh_icon.webp', logo: './images/tcg_timer/yugioh.webp' },
    { id: 'op', title: 'One Piece', defaultMin: 30, defaultSec: 0, overTime: 5, otOn: 'on', icon: './images/tcg_timer/onepiece_icon.webp', logo: './images/tcg_timer/onepiece.webp' },
    { id: 'rb', title: 'Riftbound', defaultMin: 60, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/riftbound_icon.webp', logo: './images/tcg_timer/riftbound.webp' },
    { id: 'ua', title: 'Union Arena', defaultMin: 30, defaultSec: 0, overTime: 5, otOn: 'on', icon: './images/tcg_timer/unionarena_icon.webp', logo: './images/tcg_timer/unionarena.webp' },
    { id: 'ga', title: 'Grand Archive', defaultMin: 60, defaultSec: 0, overTime: 5, otOn: 'on', icon: './images/tcg_timer/grandarchive_icon.webp', logo: './images/tcg_timer/grandarchive.webp' },
    { id: 'dm', title: 'Digimon', defaultMin: 45, defaultSec: 0, overTime: 5, otOn: 'on', icon: './images/tcg_timer/digimon_icon.webp', logo: './images/tcg_timer/digimon.webp' },
    { id: 'ws', title: 'Weiss Schwarz', defaultMin: 30, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/weissschwarz_icon.webp', logo: './images/tcg_timer/weissschwarz.webp' },
    { id: 'dbs', title: 'DragonBall Super Fusion', defaultMin: 35, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/dragonballsuperfusion_icon.webp', logo: './images/tcg_timer/dragonballsuperfusion.webp' },
    { id: 'fb', title: 'Flesh and Blood', defaultMin: 55, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/fleshandblood_icon.webp', logo: './images/tcg_timer/fleshandblood.webp' },
    { id: 'lc', title: 'Lorcana', defaultMin: 50, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/lorcana_icon.webp', logo: './images/tcg_timer/lorcana.webp' },
    { id: 'gm', title: 'Gundam', defaultMin: 30, defaultSec: 0, overTime: 5, otOn: 'on', icon: './images/tcg_timer/gundam_icon.webp', logo: './images/tcg_timer/gundam.webp' },
    { id: 'mg', title: 'Magic the Gathering', defaultMin: 50, defaultSec: 0, otOn: 'off', icon: './images/tcg_timer/magicthegathering_icon.webp', logo: './images/tcg_timer/magicthegathering.webp' },
    { id: 'pk', title: 'Pokémon', defaultMin: 50, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/pokemon_icon.webp', logo: './images/tcg_timer/pokemon.webp' },
    { id: 'ff', title: 'Final Fantasy', defaultMin: 30, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/finalfantasy_icon.webp', logo: './images/tcg_timer/finalfantasy.webp' },
    { id: 'pw', title: 'Palworld', defaultMin: 30, defaultSec: 0, overTime: 0, otOn: 'off', icon: './images/tcg_timer/palworld_icon.webp', logo: './images/tcg_timer/palworld.webp' },
    { id: 'cp', title: 'Cyberpunk', defaultMin: 50, defaultSec: 0, overTime: 10, otOn: 'on', icon: './images/tcg_timer/cyberpunk_icon.webp', logo: './images/tcg_timer/cyberpunk.webp' }
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
    dragonball: new Audio('./music/tcg_timer/dragonball_gameover.flac'),
    easterEgg: new Audio('./music/tcg_timer/easterEgg.flac')
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

// Accessibility Tooltip Function
function tooltipsEnabled() {
    const acsBtn = document.getElementById('acsBtn');
    return acsBtn ? acsBtn.classList.contains('active') : false;
}

// Generated Buttons (config.id)
const TOOLTIP_MAP = [
    ['startBtn', 'StartTooltip'],
    ['stopBtn', 'StopTooltip'],
    ['resetBtn', 'ResetTooltip'],
    ['openBtn', 'OpenTooltip'],
    ['addBtn', 'AddTooltip'],
    ['subBtn', 'SubTooltip'],
    ['timerBtn', 'CustomTooltip'],
    ['alarmBtn', 'AlarmTooltip'],
    ['tabBtn', 'TabTooltip'],
    ['muteBtn', 'MuteTooltip'],
    ['lockCustom', 'LockTimeTooltip'],
    ['Home', 'HomeTooltip'],
    ['clearName', 'ClearNameTooltip'],
    ['timerOT', 'OTTooltip'],
    ['instanceCloseBtn', 'CloseInstanceTooltip'],
    ['numBtn-controls', 'NumTooltip'],
    ['Home-controls', 'HomeCTooltip'],
    ['Home-ct', 'HomeCTooltip'],
    ['Home-st', 'HomeCTooltip'],
    ['TimerName', 'customNameTimeTooltip'],
];

// Static Buttons
const STATIC_TOOLTIP_MAP = [
    ['nt', 'TimerTooltip'],
    ['set', 'SettingsTooltip'],
    ['close', 'CloseTooltip'],
    ['createBtn', 'CreateTooltip'],
    ['themeBtn', 'ThemeTooltip'],
    ['notiBtn', 'NotiTooltip'],
    ['acsBtn', 'AccessTooltip'],
    ['PE', 'PrevTooltip'],
    ['report-btn', 'ReportTooltip'],
    ['RE', 'NextTooltip'],
    ['mobBtn', 'MobileTooltip']
];

function wireTooltip(elementId, tooltipId) {
    const element = document.getElementById(elementId);
    const tooltip = document.getElementById(tooltipId);
    if (!element || !tooltip) {
        console.warn('Tooltip wiring skipped, missing element:', elementId, tooltipId);
        return;
    }
    const show = () => {
        if (!tooltipsEnabled()) return;
        tooltip.showPopover({ source: element });
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.margin = '0';
        tooltip.style.top = `${rect.bottom + 8}px`;
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.transform = 'translateX(-50%)';
    };
    const hide = () => tooltip.hidePopover();
    element.addEventListener('pointerenter', show);
    element.addEventListener('focus', show);
    element.addEventListener('pointerleave', hide);
    element.addEventListener('blur', hide);
}

function wireTimerTooltips(iid) {
    TOOLTIP_MAP.forEach(([btnPrefix, tooltipPrefix]) => {
        wireTooltip(`${btnPrefix}-${iid}`, `${tooltipPrefix}-${iid}`);
    });
}

function wireStaticTooltips() {
    STATIC_TOOLTIP_MAP.forEach(([elementId, tooltipId]) => {
        wireTooltip(elementId, tooltipId);
    });
}

function updateRow2Visibility(gameId, count) {
    const ROW2_REVEAL_THRESHOLD = 2;
    const showRow2 = count > ROW2_REVEAL_THRESHOLD;
    document.getElementById(`timerCell-${gameId}-3`)?.toggleAttribute('hidden', !showRow2);
    document.getElementById(`timerCell-${gameId}-4`)?.toggleAttribute('hidden', !showRow2);
}

function updateInstanceControlsVisibility(gameId, count) {
    const showControls = count > 1;
    document.getElementById(`instanceControlsA-${gameId}`)?.toggleAttribute('hidden', !showControls);
    document.getElementById(`instanceControlsB-${gameId}`)?.toggleAttribute('hidden', !showControls);
}

function updateAddSecondButton(gameId, count) {
    document.getElementById(`addSecondBtn-${gameId}`)?.toggleAttribute('hidden', count > 1);
}

function updateAddFourthButton(gameId, count) {
    document.getElementById(`addFourthBtn-${gameId}`)?.toggleAttribute('hidden', count !== 3);
}


    function hideAllSettingsPanels() {
        document.querySelectorAll('.timer-controls-container, .timer-input-container, .sound-select-container')
            .forEach(panel => {
                panel.setAttribute('hidden', '')
            });

    }

    function clearSettingsButtonStates() {
    document.querySelectorAll('button[id^="numBtn-"], button[id^="timerBtn-"], button[id^="alarmBtn-"], button[id^="Home-"]')
        .forEach(btn => {
            btn.classList.remove('active');
            if (btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', 'false');
        });
}

    function syncHomeIcon(targetId) {
    const anyOpen = ['timerControls', 'customTimer', 'soundTimer'].some(prefix => {
        const el = document.getElementById(`${prefix}-${targetId}`);
        return el && !el.hasAttribute('hidden');
    });
    const homeBtn = document.getElementById(`Home-${targetId}`);
    if (homeBtn) {
        homeBtn.classList.toggle('active', anyOpen);
        homeBtn.setAttribute('aria-pressed', String(anyOpen));
    }
}

function closeSettingsForInstance(iid) {
    ['timerControls', 'customTimer', 'soundTimer'].forEach(prefix => {
        document.getElementById(`${prefix}-${iid}`)?.setAttribute('hidden', '');
    });
    document.querySelectorAll(
        `button[id^="numBtn-${iid}"], button[id^="timerBtn-${iid}"], button[id^="alarmBtn-${iid}"]`
    ).forEach(btn => {
        btn.classList.remove('active');
        if (btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', 'false');
    });
    syncHomeIcon(iid);
}

function setVisibleCount(gameId, count) {
    count = Math.max(1, Math.min(NUM_INSTANCES, count));
    for (let i = 1; i <= NUM_INSTANCES; i++) {
        const iid = `${gameId}-${i}`;
        const row = document.getElementById(`timerInstance-${iid}`);
        const tabBtn = document.getElementById(`tabBtn-${iid}`);
        const revealed = i <= count;

        if (row && !row.hidden && !revealed) {
            closeSettingsForInstance(iid);
        }
        if (row) row.hidden = !revealed;
        if (tabBtn) tabBtn.classList.toggle('timer-tab-active-view', revealed);
    }
    updateRow2Visibility(gameId, count);
    updateInstanceControlsVisibility(gameId, count);
    updateAddSecondButton(gameId, count);
    updateAddFourthButton(gameId, count);
    updateCloseButtonVisibility(gameId, count);
}

function getVisibleCount(gameId) {
    let count = 0;
    for (let i = 1; i <= NUM_INSTANCES; i++) {
        const row = document.getElementById(`timerInstance-${gameId}-${i}`);
        if (row && !row.hidden) count = i;
    }
    return count || 1;
}
    // EXCLUSIVE VIEW MANAGER
function updateExclusiveViews(viewToOpen) {
    const views = ['timer-settings-container', 'timerScreen-set', 'version-title', 'timerScreen-nt'];

    document.getElementById('timer-container')?.removeAttribute('hidden');
    const requestedEl = views.includes(viewToOpen) ? document.getElementById(viewToOpen) : null;
    const targetView = requestedEl ? viewToOpen : 'version-title';

    views.forEach(viewId => {
        const el = document.getElementById(viewId);
        if (!el) return;

        if (viewId === targetView) {
            el.removeAttribute('hidden');
            return;
        }

        el.setAttribute('hidden', '');

        if (viewId === 'timer-settings-container') {
            hideAllSettingsPanels();
            clearSettingsButtonStates();
        } else if (viewId === 'timerScreen-nt') {
            ['nt', 'ntm'].forEach(id => document.getElementById(id)?.classList.remove('active'));
        } else if (viewId === 'timerScreen-set') {
            ['set', 'setm'].forEach(id => document.getElementById(id)?.classList.remove('active'));
        }
    });
}

function closeGameTimer(gameId) {
    if (gameId === 'nt' || gameId === 'set') return;
    const screen = document.getElementById(`timerScreen-${gameId}`);
    const selectElement = document.getElementById('timerSelection');

    const optionToRestore = selectElement?.querySelector(`option[value="${gameId}"]`);
    if (optionToRestore) {
        optionToRestore.hidden = false;
        optionToRestore.disabled = false;
    }

    removeNavButton(gameId);
    screen?.setAttribute('hidden', '');
    setVisibleCount(gameId, 1);

    for (let n = 1; n <= NUM_INSTANCES; n++) {
        GameTimer.registry.get(`${gameId}-${n}`)?.resetToDefault();
    }
}

// DOM LOADED CONTENT
document.addEventListener("DOMContentLoaded", () => {
    wireStaticTooltips();

    const acsBtn = document.getElementById('acsBtn');
    if (acsBtn) {
        acsBtn.addEventListener('click', () => {
            if (!tooltipsEnabled()) {
                document.querySelectorAll('[popover]:popover-open').forEach(el => el.hidePopover());
            }
        });
    }



    // Shared by every path that closes settings sub-panels (numBtn/Home/timerBtn/alarmBtn/
    // and the forced-close path above) so all four stay in sync with each other.

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

function applyPersistedToggle(elementId, storageKey) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let isActive = localStorage.getItem(storageKey) === 'on';
    if (elementId === 'notiBtn') {
        isActive = isActive && Notification.permission === 'granted';
    }

    el.classList.toggle('active', isActive);
    if (el.hasAttribute('aria-pressed')) {
        el.setAttribute('aria-pressed', String(isActive));
    }
}

    const storedTheme = localStorage.getItem("theme") || "dark";
    root.classList.remove("light", "dark");
    root.classList.add(storedTheme);
    updateThemeLogo(storedTheme);
    applyPersistedToggle('acsBtn', 'access-enabled');
    applyPersistedToggle('notiBtn', 'notifications-enabled');

    // instance reveal count (per game, timers 1-4) - 3C-prep

    function setupInstanceTabs(config) {
        for (let n = 1; n <= NUM_INSTANCES; n++) {
            const btn = document.getElementById(`tabBtn-${config.id}-${n}`);
            if (!btn) continue;
            btn.addEventListener('click', () => setVisibleCount(config.id, n));
        }
    }
    gameConfigs.forEach(setupInstanceTabs);
gameConfigs.forEach(config => {
    const count = getVisibleCount(config.id);
    updateRow2Visibility(config.id, count);
    updateInstanceControlsVisibility(config.id, count);
    updateAddSecondButton(config.id, count);
    updateAddFourthButton(config.id, count);
    updateCloseButtonVisibility(config.id, count);
});
gameConfigs.forEach(config => {
    wireTooltip(`addSecondBtn-${config.id}`, `AddSecondTooltip-${config.id}`);
    wireTooltip(`addFourthBtn-${config.id}`, `AddFourthTooltip-${config.id}`);
});

    // toggle button function - 3C
    function toggleSection(targetId, buttonId, buttonElement) {

        // NT and SET Exclusivity Block
        if (buttonId === 'nt' || buttonId === 'set' || buttonId === 'ntm' || buttonId === 'setm') {
            const showNt = buttonId === 'nt' || buttonId === 'ntm';
            const targetViewId = showNt ? 'timerScreen-nt' : 'timerScreen-set';
            const targetSection = document.getElementById(targetViewId);
            const isAlreadyOpen = targetSection && !targetSection.hasAttribute('hidden');

            if (isAlreadyOpen) {
                updateExclusiveViews('version-title');
            } else {
                updateExclusiveViews(targetViewId);
                const activeIds = showNt ? ['nt', 'ntm'] : ['set', 'setm'];
                activeIds.forEach(id => document.getElementById(id)?.classList.add('active'));
            }
            return;
        }

        const PERSISTED_TOGGLES = {
            acsBtn: 'access-enabled',
            notiBtn: 'notifications-enabled'
        };

        if (buttonElement) {
            buttonElement.classList.toggle('active');
            const isActive = buttonElement.classList.contains('active');
            if (buttonElement.hasAttribute('aria-pressed')) {
                buttonElement.setAttribute('aria-pressed', isActive);
            }
            const storageKey = PERSISTED_TOGGLES[buttonId];
            if (storageKey) {
                localStorage.setItem(storageKey, isActive ? 'on' : 'off');
            }
        }

        if (!targetId) return;

        const isNumBtn = buttonId.startsWith('numBtn-');
        const isHomeBtn = buttonId.startsWith('Home-');
        const isTimerBtn = buttonId.startsWith('timerBtn-');
        const isAlarmBtn = buttonId.startsWith('alarmBtn-');

        // numBtn — closes the entire settings drill-down, back to the mini-grid
        if (isNumBtn) {
            hideAllSettingsPanels();
            clearSettingsButtonStates();
            updateExclusiveViews('version-title');
            document.getElementById(`Home-${targetId}`)?.classList.remove('active');
            document.getElementById(`Home-${targetId}`)?.setAttribute('aria-pressed', 'false');
            syncHomeIcon(targetId);
            return;
        }

        // Home — steps back to timerControls specifically, from customTimer or soundTimer
        if (isHomeBtn) {
            hideAllSettingsPanels();
            clearSettingsButtonStates();
            document.getElementById(`timerControls-${targetId}`)?.removeAttribute('hidden');
            updateExclusiveViews('timer-settings-container', syncHomeIcon(targetId));
            document.getElementById(`Home-${targetId}`)?.classList.add('active');
            document.getElementById(`Home-${targetId}`)?.setAttribute('aria-pressed', 'true');
            syncHomeIcon(targetId);
            updateExclusiveViews('timer-settings-container', syncHomeIcon(targetId));
            return;
        }

        // timerBtn / alarmBtn — open customTimer/soundTimer, hide timerControls + each other
        if (isTimerBtn || isAlarmBtn) {
            const sectionIdToToggle = isTimerBtn ? `customTimer-${targetId}` : `soundTimer-${targetId}`;
            const targetSection = document.getElementById(sectionIdToToggle);
            const isAlreadyOpen = targetSection && !targetSection.hasAttribute('hidden');

            hideAllSettingsPanels();
            clearSettingsButtonStates();

            if (!isAlreadyOpen) {
                updateExclusiveViews('timer-settings-container', syncHomeIcon(targetId));
                targetSection?.removeAttribute('hidden');
                if (buttonElement) {
                    buttonElement.classList.add('active');
                    if (buttonElement.hasAttribute('aria-pressed')) buttonElement.setAttribute('aria-pressed', 'true');
                }
                document.getElementById(`Home-${targetId}`)?.classList.add('active');
                document.getElementById(`Home-${targetId}`)?.setAttribute('aria-pressed', 'true');
            } else {
                updateExclusiveViews('version-title');
            }
            syncHomeIcon(targetId);
            return;
        }

        let sectionIdToToggle = null;
        switch (buttonId) {
            case 'aboutBtn': sectionIdToToggle = 'about'; break;
            case 'updateBtn': sectionIdToToggle = 'update'; break;
            case 'infoBtn': sectionIdToToggle = 'info'; break;
            default: sectionIdToToggle = `timerScreen-${targetId}`; break;
        }

        // About / Update / Info are mutually exclusive with each other
        const ABOUT_GROUP = { aboutBtn: 'about', updateBtn: 'update', infoBtn: 'info' };
        if (buttonId in ABOUT_GROUP) {
            Object.entries(ABOUT_GROUP).forEach(([otherBtnId, otherSectionId]) => {
                if (otherBtnId === buttonId) return;
                const otherSection = document.getElementById(otherSectionId);
                if (otherSection && !otherSection.hasAttribute('hidden')) {
                    otherSection.setAttribute('hidden', '');
                    document.getElementById(otherBtnId)?.classList.remove('active');
                }
            });
        }

        if (sectionIdToToggle) {
            document.getElementById(sectionIdToToggle)?.toggleAttribute('hidden');
        }
        if (buttonElement) {
            buttonElement.classList.toggle('active');
            if (buttonElement.hasAttribute('aria-pressed')) {
                buttonElement.setAttribute('aria-pressed', buttonElement.classList.contains('active'));
            }
        }
    }

    // secondary button function - 3D
    document.addEventListener("click", (event) => {
        const btn = event.target.closest('[data-action], #themeBtn');
        if (!btn) return;

        const action = btn.dataset.action;
        const buttonId = btn.id;

        // Theme Toggle - 3E
        if (buttonId === "themeBtn") {
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
                toggleSection(btn.dataset.target || '', buttonId, btn);
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
                updateExclusiveViews('version-title');

                const config = gameConfigs.find(c => c.id === selectedValue);
                if (!config) {
                    console.error(`choose-timer: no gameConfigs entry for "${selectedValue}"`);
                    return;
                }
                createNavButton(config);
                document.getElementById('timer-container')
                    ?.appendChild(document.getElementById(`timerScreen-${config.id}`));
                toggleSection(selectedValue, buttonId, btn);
                break;
            }

            case 'close-timer': {
                document.querySelectorAll('[id^="timerScreen-"]:not([hidden])').forEach((screen) => {
                    closeGameTimer(screen.id.replace('timerScreen-', ''));
                });
                updateExclusiveViews('version-title');
                document.getElementById('timer-container')?.removeAttribute('hidden');
                break;
            }
            case 'reveal-second': {
                const gameId = btn.dataset.target;
                if (!gameId) return;
                setVisibleCount(gameId, 2);
                break;
            }
            case 'reveal-fourth': {
                const gameId = btn.dataset.target;
                if (!gameId) return;
                setVisibleCount(gameId, 4);
                break;
            }
        }
    });
});


const salt = document.getElementById('saltIcon');
let saltClickCount = 0;
function restartAnimation(el, className) {
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
}
salt.addEventListener('mouseenter', () => {
    salt.src = salt.dataset.hover;
    restartAnimation(salt, 'shake');
});
salt.addEventListener('mouseleave', () => {
    salt.src = salt.dataset.normal;
    salt.classList.remove('shake');
});
salt.addEventListener('click', () => {
    salt.src = salt.dataset.click;
    restartAnimation(salt, 'pop');
    saltClickCount++;
    if (saltClickCount === 20) {
        playSound('easterEgg');

        saltClickCount = 0;
    }
    if (!saltClickCount) {
        console.error(`STOP HITTING HIM!!`);
        return;
    }
});
salt.addEventListener('animationend', (e) => {
    if (e.animationName === 'shrink-grow') {
        salt.classList.remove('pop');
        salt.src = salt.matches(':hover') ? salt.dataset.hover : salt.dataset.normal;
    }
});
// COPYRIGHT YEAR
document.getElementById("current-year").textContent = `© ${new Date().getFullYear()}`;
// TIMER TEMPLATE - 5A
const NUM_INSTANCES = 4;

// Timer Cell
function createInstanceHTML(config, n) {
    const iid = `${config.id}-${n}`;
    const closeLabel = n === 1 ? `Delete ${config.title} Timer` : `Reset and Close Timer ${n} for ${config.title}`;
    return `
    <div class="timer-cell" id="timerCell-${iid}">
        <div class="timer-cell-inner" id="timerInstance-${iid}"${n === 1 ? '' : ' hidden'}>
            <button id="Home-${iid}" aria-pressed="false" class="timer-num-btn" data-action="toggle" data-target="${iid}" aria-label="Timer ${n} controls for ${config.title}" aria-describedby="HomeTooltip-${iid}">
                <picture class="ui-picture">
                    <img class="ui-button" src="./images/tcg_timer/ui/settings.webp" alt="Settings">
                </picture>
            </button>
            <div id="HomeTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
            ${config.title} Timer ${n} Controls
            </div>

<button id="instanceCloseBtn-${iid}" class="timer-close-btn"${n === 1 ? '' : ' hidden'}
        aria-label="${closeLabel}" aria-describedby="CloseInstanceTooltip-${iid}">
                        <picture class="ui-picture">
                    <img class="ui-button" src="./images/tcg_timer/ui/delete.webp" alt="Close">
                </picture>
            </button>
            <div id="CloseInstanceTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
            ${closeLabel}
            </div>

            <img class="logo" src="${config.logo}">

            <div id="timerDisplay-${iid}" class="timerDisplay">
                <span id="timerName-${iid}" class="timer-name">Timer ${n}</span>
                <h1 id="time-${iid}" class="time">
                ${String(config.defaultMin).padStart(2, '0')}:${String(config.defaultSec).padStart(2, '0')}
                </h1>
            </div>
            <div id="timerOptions-${iid}" class="timerOptions">
                <span class="timer-OT">OT</span>
                <button type="button" id="timerOT-${iid}" class="otbutton"
                        aria-pressed="${config.otOn === 'on'}"
                        aria-label="Toggle Overtime for ${config.title} Timer ${n}"
                        aria-describedby="OTTooltip-${iid}">
                    <picture class="ui-picture">
                        <img src="./images/tcg_timer/ui/setting_${config.otOn}.webp" id="timerOTIcon-${iid}" class="ui-button"
                            alt="Overtime ${config.otOn === 'on' ? 'enabled' : 'disabled'}">
                    </picture>
                </button>
            </div>
            <div id="OTTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
                Toggle Overtime for ${config.title} Timer ${n}
            </div>
        </div>
        ${n === 2 ? `
        <button type="button" id="addSecondBtn-${config.id}" class="add-instance-btn"
                data-action="reveal-second" data-target="${config.id}"
                aria-label="Add a second timer for ${config.title}"
                aria-describedby="AddSecondTooltip-${config.id}">
            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/add.webp" alt="Add"></picture>
        </button>
        <div id="AddSecondTooltip-${config.id}" popover="hint" style="text-wrap: pretty;">
        Add a second timer for ${config.title}
        </div>` : ''}
        ${n === 4 ? `
        <button type="button" id="addFourthBtn-${config.id}" class="add-instance-btn"
                data-action="reveal-fourth" data-target="${config.id}"
                aria-label="Add a fourth timer for ${config.title}"
                aria-describedby="AddFourthTooltip-${config.id}">
            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/add.webp" alt="Add"></picture>
        </button>
        <div id="AddFourthTooltip-${config.id}" popover="hint" style="text-wrap: pretty;">
        Add a fourth timer for ${config.title}
        </div>` : ''}
    </div>`;
}

function createInstanceControlsHTML(config) {
    const tabHTML = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i).map(t => `
        <button id="tabBtn-${config.id}-${t}"
                class="btn-16 button timer-tab timer-tab-idle${t === 1 ? ' timer-tab-active-view' : ''}"
                data-game="${config.id}" data-instance="${t}">
            <picture class="ui-picture"> <img class="ui-button-timer-num" src="./images/tcg_timer/ui/timer_${t}.webp"
                    alt="Timer_${t}" aria-label="Timer ${t} for ${config.title}"
                    aria-describedby="TabTooltip-${config.id}-${t}"></picture>
        </button>
        <div id="TabTooltip-${config.id}-${t}" popover="hint" style="text-wrap: pretty;">
        ${config.title} Timer ${t}
        </div>`).join('');

    return `
        <div class="btn-row-16 tab-group tab-group-left" id="instanceControlsA-${config.id}" hidden>
            ${tabHTML(1, 2)}
        </div>
        <div class="btn-row-16 tab-group tab-group-right" id="instanceControlsB-${config.id}" hidden>
            ${tabHTML(3, 4)}
        </div>`;
}

function createSettingsHTML(config, n) {
    const iid = `${config.id}-${n}`;
    return `
        <div class="section-block timer-controls-container" id="timerControls-${iid}" hidden>
            <div class="area controls-area c1-row2">
                ${createTimerSettingsNav(config, n, 'controls')}
                <div class="input-group name-input-group" id="nameInputGroup-${iid}" hidden>
                    <label for="nameInput-${iid}">
                        <h2>Timer Name</h2>
                    </label>
                    <div class="name-input-row">
                        <input type="text" id="nameInput-${iid}" maxlength="10"
                            placeholder="Timer ${n}" class="incinput name-input"
                            aria-label="Custom name for ${config.title} Timer ${n}">
                        <button type="button" id="clearName-${iid}" class="clear-name-btn"
                                aria-describedby="ClearNameTooltip-${iid}">
                            <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/delete.webp"
                                    alt="Clear Name" aria-label="Clear Name for ${iid}"></picture>
                        </button>
                    </div>
                </div>
                <div id="ClearNameTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
                Clear the custom name for ${config.title} Timer ${n}
                </div>
                <hr class="clean-line">

                <div class="btn-row-32">
                    <button id="startBtn-${iid}" class="btn-32">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/start.webp"
                                alt="start" aria-label="Start ${config.title}" aria-describedby="StartTooltip-${iid}"></picture>
                    </button>
                    <div id="StartTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Start Timer for ${config.title}</div>

                    <button id="stopBtn-${iid}" class="btn-32">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/stop.webp"
                                alt="stop" aria-label="Stop ${config.title}" aria-describedby="StopTooltip-${iid}"></picture>
                    </button>
                    <div id="StopTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Stop Timer for ${config.title}</div>

                    <button id="resetBtn-${iid}" class="btn-32">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/reset.webp"
                                alt="reset" aria-label="Reset ${config.title}" aria-describedby="ResetTooltip-${iid}"></picture>
                    </button>
                    <div id="ResetTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Reset Timer for ${config.title}</div>

                    <button id="timerBtn-${iid}" class="btn-32" data-action="toggle" data-target="${iid}">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/custom.webp"
                                alt="custom" aria-describedby="CustomTooltip-${iid}"></picture>
                    </button>
                    <div id="CustomTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Custom Timer Settings for ${config.title}</div>

                    <button id="addBtn-${iid}" class="btn-32">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/increment.webp"
                                alt="add" aria-describedby="AddTooltip-${iid}"></picture>
                    </button>
                    <div id="AddTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Add Increment of Time for ${config.title}</div>

                    <button id="subBtn-${iid}" class="btn-32">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/decrement.webp"
                                alt="sub" aria-describedby="SubTooltip-${iid}"></picture>
                    </button>
                    <div id="SubTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Subtract Increment of Time for ${config.title}</div>

                    <button id="openBtn-${iid}" class="btn-32">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/chromecast.webp"
                                alt="open" aria-describedby="OpenTooltip-${iid}"></picture>
                    </button>
                    <div id="OpenTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Open FullScreen Timer for ${config.title}</div>

                    <button id="alarmBtn-${iid}" class="btn-32" data-action="toggle" data-target="${iid}">
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/alarm.webp"
                                alt="alarm" aria-describedby="AlarmTooltip-${iid}"></picture>
                    </button>
                    <div id="AlarmTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Alarm Settings for ${config.title}</div>

                    <button id="muteBtn-${iid}" class="btn-32" onclick="toggleMute('${iid}')">
                        <picture class="ui-picture">
                            <img class="ui-button" src="./images/tcg_timer/ui/unmute.webp" alt="unmute" aria-describedby="MuteTooltip-${iid}">
                        </picture>
                    </button>
                    <div id="MuteTooltip-${iid}" popover="hint" style="text-wrap: pretty;">Mute Alarm for ${config.title}</div>
                </div>
            </div>
        </div>

        <div class="section-block timer-input-container" id="customTimer-${iid}" hidden>
            ${createTimerSettingsNav(config, n, 'ct')}

            <div class="customtimer-grid">
                <h2 id="incrementLabel-${iid}" class="ct-row-1">Increment Amount</h2>
                <center class="ct-row-2">
                    <input type="text" id="numberIncrement-${iid}" inputmode="numeric" pattern="\\d*"
                           value="00:01" aria-labelledby="incrementLabel-${iid}" class="incinput">
                </center>
                <center class="ct-row-3">
                    <input type="range" id="rangeIncrement-${iid}" min="0" max="300" value="59" step="5"
                           aria-labelledby="incrementLabel-${iid}" class="incrange">
                </center>

                <h2 id="customTimerLabel-${iid}" class="ct-row-4">Custom Timer</h2>
                <div class="dual-col-row ct-row-5">
                    <input type="range" id="rangeCustom-${iid}" min="0" max="18000" value="69" step="5"
                           aria-labelledby="customTimerLabel-${iid}" class="incrange">
                    <button type="button" id="lockCustom-${iid}" class="toggle-btn" aria-pressed="false">
                        <span class="switch"></span>
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/decline.webp"
                                alt="Lock Custom Time" aria-label="Lock Custom Time for ${iid}"
                                aria-describedby="LockTimeTooltip-${iid}"></picture>
                    </button>
                    <div id="LockTimeTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
                    Lock Custom Timer for ${config.title}
                    </div>
                </div>
                <center class="ct-row-6">
                    <input type="text" id="numberCustom-${iid}" inputmode="numeric" pattern="\\d*"
                           value="00:01" aria-labelledby="customTimerLabel-${iid}" class="incinput">
                </center>

                <h2 id="overtimeLabel-${iid}" class="ct-row-7">Overtime Timer</h2>
                <div class="dual-col-row ct-row-8">
                    <input type="range" id="rangeOvertime-${iid}" min="0" max="18000" value="69" step="5"
                           aria-labelledby="overtimeLabel-${iid}" class="incrange">
                    <button type="button" id="overtimerActive-${iid}" class="toggle-btn" aria-pressed="false">
                        <span class="switch"></span>
                        <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/decline.webp"
                                alt="Enable Overtime" aria-label="Enable Overtime for ${iid}"
                                aria-describedby="LockOvertimeTooltip-${iid}"></picture>
                    </button>
                    <div id="LockOvertimeTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
                    Enable Overtime for ${config.title}
                    </div>
                </div>
                <center class="ct-row-9">
                    <input type="text" id="numberOvertime-${iid}" inputmode="numeric" pattern="\\d*"
                           value="00:01" aria-labelledby="overtimeLabel-${iid}" class="incinput">
                </center>
            </div>
        </div>

        <div class="section-block sound-select-container" id="soundTimer-${iid}" hidden>
            <div class="area alarm-area c1-row2">
                ${createTimerSettingsNav(config, n, 'st')}

                <label for="soundSelect-${iid}">
                    <h2>Choose an alarm:</h2>
                </label>
                <hr class="clean-line">
                <select id="soundSelect-${iid}">
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
                    <button id="previewBtn-${iid}" class="btn-52" onclick="playSelectedSound('${iid}')" style="cursor:help;">
                        <picture class="ui-picture"> <img class="ui-button"
                                src="./images/tcg_timer/ui/test.webp" alt="preview"></picture>
                    </button>
                </div>
            </div>
        </div>`;
}
function createTimerHTML(config) {
    return `
    <section id="timerScreen-${config.id}" class="no-select timerScreen-card" hidden>
        <div class="section-block-timer">
            <div class="c2-row2">
                <div class="mini-grid" id="timerGroup-${config.id}">
                    ${Array.from({ length: NUM_INSTANCES }, (_, i) => i + 1)
            .map(n => createInstanceHTML(config, n)).join('')}
                    ${createInstanceControlsHTML(config)}
                </div>
            </div>
        </div>
    </section>`;
}
function createNavButtonHTML(config) {
    return `
    <button class="btn-125 nav-btn active" id="${config.id}" data-action="toggle" data-target="${config.id}">
        <picture class="logo-picture">
            <img class="logo-button" src="${config.icon}" alt="${config.id}">
        </picture>
    </button>`;
}
function createTimerSettingsNav(config, n, variant) {
    const iid = `${config.id}-${n}`;
    const isControls = variant === 'controls';
    const suffix = `-${variant}`;

    return `
        <div class="timer-settings-nav">
            <div class="nav-icon-wrap">
                <img class="logo" src="${config.icon}">
                <button id="numBtn${suffix}-${iid}" class="timer-num-btn small-num-btn"
                        data-action="toggle" data-target="${iid}"
                        ${isControls ? `aria-describedby="NumTooltip-${iid}"` : `aria-label="Back to ${config.title} Timer ${n} controls"`}>
                    <picture class="ui-picture"> <img class="ui-button small-ui-button" src="./images/tcg_timer/ui/decline.webp"
                            alt="Timer_${n}" aria-label="Timer ${n} for ${config.title}"></picture>
                </button>
                ${isControls ? `
                <div id="NumTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
                Close ${config.title} Settings
                </div>` : ''}
            </div>

            <button id="Home${suffix}-${iid}" aria-pressed="false" class="btn-52" data-action="toggle" data-target="${iid}"><picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/home.webp"
                                alt="Timer Settings" aria-label="Timer Settings for ${iid}"
                                aria-describedby="HomeCTooltip-${iid}"></picture></button>
                                <div id="HomeCTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
                Return to ${config.title} Settings
                </div>

            <div class="nav-col-3"${isControls ? '' : ' hidden'}>
                ${isControls ? `
                <button id="TimerName-${iid}" class="btn-52" aria-pressed="false">
                <picture class="ui-picture"> <img class="ui-button" src="./images/tcg_timer/ui/notes.webp"
                                alt="Show Custom Timer Name" aria-label="Custom Timer Name for ${iid}"
                                aria-describedby="customNameTimeTooltip-${iid}"></picture></button>
                                <div id="customNameTimeTooltip-${iid}" popover="hint" style="text-wrap: pretty;">
                Rename ${config.title} Timer
                </div>` : ''}
            </div>
        </div>`;
}
function createNavButton(config) {
    const container = document.getElementById('navbar-container');
    if (!container) {
        console.warn('createNavButton: #navbar-container not found in the DOM.');
        return null;
    }
    const existing = document.getElementById(config.id);
    if (existing) return existing;
    container.insertAdjacentHTML('beforeend', createNavButtonHTML(config));
    return document.getElementById(config.id);
}

function updateCloseButtonVisibility(gameId, count) {
    for (let i = 1; i <= NUM_INSTANCES; i++) {
        const closeBtn = document.getElementById(`instanceCloseBtn-${gameId}-${i}`);
        if (closeBtn) closeBtn.hidden = (i !== count);
    }
}
function removeNavButton(gameId) {
    const btn = document.getElementById(gameId);
    if (btn) btn.remove();
}
const timerContainer = document.getElementById('timer-container');
if (timerContainer) {
    timerContainer.innerHTML = gameConfigs.map(config => createTimerHTML(config)).join('');
}
const settingsContainer = document.getElementById('timer-settings-container');
if (settingsContainer) {
    settingsContainer.innerHTML = gameConfigs.map(config => {
        return Array.from({ length: NUM_INSTANCES }, (_, i) => i + 1)
            .map(n => createSettingsHTML(config, n)).join('');
    }).join('');
}

gameConfigs.forEach(config => {
    for (let n = 1; n <= NUM_INSTANCES; n++) {
        wireTimerTooltips(`${config.id}-${n}`);
    }
});
// custom increment amount function - 5B
function wireToggleButton(el) {
    if (!el || el._toggleWired) return;
    el._toggleWired = true;
    el.active = el.classList.contains('active');
    el.setAttribute('aria-pressed', String(el.active));
    el.addEventListener('click', () => {
        el.active = !el.active;
        el.classList.toggle('active', el.active);
        el.setAttribute('aria-pressed', String(el.active));
    });
}
function setToggleButtonState(el, isActive) {
    if (!el) return;
    el.active = isActive;
    el.classList.toggle('active', isActive);
    el.setAttribute('aria-pressed', String(isActive));
}

// custom increment amount function - 5C
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
function initRangeTimeSync(config, n) {
    const iid = `${config.id}-${n}`;
    const range = document.getElementById(`rangeIncrement-${iid}`);
    const numberBox = document.getElementById(`numberIncrement-${iid}`);
    if (!range || !numberBox) {
        console.warn(`initRangeTimeSync: could not find elements for targetId "${iid}"`);
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
gameConfigs.forEach(config => {
    for (let n = 1; n <= NUM_INSTANCES; n++) {
        initRangeTimeSync(config, n);
    }
});
// GAME TIMER - 6A
class GameTimer {
    static registry = new Map();
    constructor(config, instanceNum) {
        this.bc = new BroadcastChannel('tcg_timer_channel');
        this.config = config;
        this.instanceNum = instanceNum;
        this.iid = `${config.id}-${instanceNum}`;
        this.durationMs = ((config.defaultMin * 60) + config.defaultSec) * 1000;
        this.remainingMs = this.durationMs;
        this.worker = new Worker('./json/timerWorker.js');
        this.isRunning = false;
        this.overtimeM = (config.overTime || 0) * 60;
        this.otOn = config.otOn || 'off';
        // Timer buttons and elements -6B
        this.displayElement = document.getElementById(`time-${this.iid}`);
        this.startbutton = document.getElementById(`startBtn-${this.iid}`);
        this.stopbutton = document.getElementById(`stopBtn-${this.iid}`);
        this.resetbutton = document.getElementById(`resetBtn-${this.iid}`);
        this.openbutton = document.getElementById(`openBtn-${this.iid}`);
        this.addbutton = document.getElementById(`addBtn-${this.iid}`);
        this.subbutton = document.getElementById(`subBtn-${this.iid}`);
        this.alarmbutton = document.getElementById(`alarmBtn-${this.iid}`);
        this.timerElement = document.getElementById(`timerDisplay-${this.iid}`);
        this.timeElement = document.getElementById(`time-${this.iid}`);
        this.customOt = document.getElementById(`customOt-${this.iid}`);
        this.overtimeButton = document.getElementById(`overBtn-${this.iid}`);
        this.customIncrement = document.getElementById(`numberIncrement-${this.iid}`);
        this.notifications = document.getElementById(`notiBtn`);
        this.tabButton = document.getElementById(`tabBtn-${config.id}-${instanceNum}`);
        this.nameInput = document.getElementById(`nameInput-${this.iid}`);
        this.nameDisplay = document.getElementById(`timerName-${this.iid}`);
        this.clearNameBtn = document.getElementById(`clearName-${this.iid}`);
        this.timerNameBtn = document.getElementById(`TimerName-${this.iid}`);
        this.nameInputGroup = document.getElementById(`nameInputGroup-${this.iid}`);
        this.timerOTBtn = document.getElementById(`timerOT-${this.iid}`);
        this.timerOTIcon = document.getElementById(`timerOTIcon-${this.iid}`);
        this.instanceCloseBtn = document.getElementById(`instanceCloseBtn-${this.iid}`);
        this.defaultName = `Timer ${this.instanceNum}`;
    if (this.instanceCloseBtn) {
        this.instanceCloseBtn.addEventListener('click', () => {
            if (this.instanceNum === 1) {
                closeGameTimer(this.config.id);
                updateExclusiveViews('version-title');
                document.getElementById('timer-container')?.removeAttribute('hidden');
            } else {
                this.reset();
                setVisibleCount(this.config.id, this.instanceNum - 1);
            }
        });
    }
        GameTimer.registry.set(this.iid, this);
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
                playSelectedSound(this.iid);
                // Notification push based on checkbox value
                if (this.notifications.checked &&
                    'Notification' in window &&
                    Notification.permission === 'granted' &&
                    document.hidden) {
                    const n = new Notification(`${this.config.title} timer finished!`, {
                        body: 'Call the Match!',
                        tag: `tcg-timer-${this.iid}`,
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
                this.updateTabStatus('stopped');
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
        this.rangeCustom = document.getElementById(`rangeCustom-${this.iid}`);
        this.numberCustom = document.getElementById(`numberCustom-${this.iid}`);
        this.lockCustom = document.getElementById(`lockCustom-${this.iid}`);
        wireToggleButton(this.lockCustom);
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

            if (this.timerOTBtn && this.overtimerActive) {
                this.timerOTBtn.addEventListener('click', () => {
                    const isOn = this.overtimerActive.classList.contains('active');
                    setToggleButtonState(this.overtimerActive, !isOn);
                    this.updateOTIcon();
                });
            }
            if (this.openbutton) {
            this.openbutton.addEventListener('click', () => {
                window.open(`timerfs.html?game=${this.config.id}&instance=${this.instanceNum}`, '_blank'); setTimeout(() => {
                    this.broadcastState(this.isRunning ? 'running' : 'stopped');
                }, 500);
            });
        }
        //Custom Timer Name
        if (this.nameInput && this.nameDisplay) {
            const nameKey = `timerName-${this.iid}`;

            const savedName = localStorage.getItem(nameKey);
            if (savedName) {
                this.nameInput.value = savedName;
                this.nameDisplay.textContent = savedName;
            }

            const applyName = () => {
                const value = this.nameInput.value.trim();
                this.nameDisplay.textContent = value || this.defaultName;
                if (value) {
                    localStorage.setItem(nameKey, value);
                } else {
                    localStorage.removeItem(nameKey);
                }
                this.broadcastState(this.isRunning ? 'running' : 'stopped');
            };

            this.nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    applyName();
                    this.nameInput.blur();
                }
            });
            this.nameInput.addEventListener('blur', applyName);
        }

        if (this.clearNameBtn) {
            this.clearNameBtn.addEventListener('click', () => {
                this.clearName();
                this.broadcastState(this.isRunning ? 'running' : 'stopped');
            });
        }

        if (this.timerNameBtn && this.nameInputGroup) {
            this.timerNameBtn.addEventListener('click', () => {
                const nowVisible = this.nameInputGroup.hasAttribute('hidden');
                if (nowVisible) {
                    this.nameInputGroup.removeAttribute('hidden');
                } else {
                    this.nameInputGroup.setAttribute('hidden', '');
                }
                this.timerNameBtn.classList.toggle('active', nowVisible);
                this.timerNameBtn.setAttribute('aria-pressed', String(nowVisible));
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
            status: status,
            instance: this.instanceNum,
            name: this.nameDisplay ? this.nameDisplay.textContent : this.defaultName
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
        this.updateTabStatus('running');
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
        this.updateTabStatus('stopped');
    }
    getResetDurationSeconds() {
        const defaultTotalSeconds = (this.config.defaultMin * 60) + this.config.defaultSec;
        if (this.lockCustom && this.lockCustom.active && this.rangeCustom) {
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
        this.updateTabStatus('reset');
    }
    // TIME RENDER - 6M
    renderTime(totalSeconds) {
        const safeSeconds = Math.round(totalSeconds);
        const mins = Math.floor(safeSeconds / 60);
        const secs = safeSeconds % 60;
        this.displayElement.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    // BROWSER NOTIFICATION - 6N
static initNotificationPermissionRequest(btnEl) {
    if (!btnEl || GameTimer._notificationListenerAttached) return;
    GameTimer._notificationListenerAttached = true;

    btnEl.addEventListener('click', () => {
        if (btnEl.classList.contains('active') && 'Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });
}
    // OVERTIME SYSTEM - 6O
    setupOvertimeSystem(config) {
        this.rangeOvertime = document.getElementById(`rangeOvertime-${this.iid}`);
        this.numberOvertime = document.getElementById(`numberOvertime-${this.iid}`);
        this.overtimerActive = document.getElementById(`overtimerActive-${this.iid}`);
        wireToggleButton(this.overtimerActive);

        this.overtimeUsed = false;
        if (this.overtimerActive) {
            setToggleButtonState(this.overtimerActive, this.otOn === 'on');
            this.overtimerActive.addEventListener('click', () => this.updateOTIcon());
            this.updateOTIcon();
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
        const active = this.overtimerActive && this.overtimerActive.active;
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
        this.updateTabStatus('running');
        console.log(`${this.iid} entering overtime: ${this.overtimeM}s`);
        return true;
    }

updateOTIcon() {
    if (!this.timerOTIcon || !this.overtimerActive) return;
    const isOn = this.overtimerActive.classList.contains('active');
    this.timerOTIcon.src = `./images/tcg_timer/ui/setting_${isOn ? 'on' : 'off'}.webp`;
    this.timerOTIcon.alt = `Overtime ${isOn ? 'enabled' : 'disabled'}`;
    if (this.timerOTBtn) this.timerOTBtn.setAttribute('aria-pressed', String(isOn));
}

    // TAB STATUS - 6P
    updateTabStatus(status) {
        if (!this.tabButton) return;
        this.tabButton.classList.remove('timer-tab-stopped', 'timer-tab-running');
        if (status === 'running') this.tabButton.classList.add('timer-tab-running');
        else if (status === 'stopped') this.tabButton.classList.add('timer-tab-stopped');
    }

    // CLEAR TIMER NAME
    clearName() {
        if (this.nameInput) this.nameInput.value = '';
        if (this.nameDisplay) this.nameDisplay.textContent = this.defaultName;
        localStorage.removeItem(`timerName-${this.iid}`);
    }


    // FULL RESET TO DEFAULTS - 6Q
    resetToDefault() {
        this.worker.postMessage({ cmd: 'stop' });
        this.isRunning = false;
        this.overtimeUsed = false;
        // Unlock and clear the custom-time lock so it can't override the default
        if (this.lockCustom) setToggleButtonState(this.lockCustom, false);
        this.unlockCustomSlider();
        // Revert the custom timer slider back to the game's true default duration
        const defaultTotalSeconds = (this.config.defaultMin * 60) + this.config.defaultSec;
        if (this.rangeCustom && this.numberCustom) {
            const rangeMin = Number(this.rangeCustom.min) || 1;
            const rangeMax = Number(this.rangeCustom.max) || 3600;
            const clamped = Math.max(rangeMin, Math.min(rangeMax, defaultTotalSeconds));
            this.rangeCustom.value = clamped;
            this.numberCustom.value = secondsToTimeString(clamped, rangeMin, rangeMax);
        }
        // Revert overtime settings back to the game's configured defaults
        const defaultOvertimeSeconds = (this.config.overTime || 0) * 60;
        if (this.rangeOvertime && this.numberOvertime) {
            const otMin = Number(this.rangeOvertime.min) || 0;
            const otMax = Number(this.rangeOvertime.max) || 3600;
            const otClamped = Math.max(otMin, Math.min(otMax, defaultOvertimeSeconds));
            this.rangeOvertime.value = otClamped;
            this.numberOvertime.value = secondsToTimeString(otClamped, otMin, otMax);
            this.overtimeM = otClamped;
        }
        if (this.overtimerActive) {
            setToggleButtonState(this.overtimerActive, this.config.otOn === 'on');
        }
        this.updateOTIcon();
        // Apply the reverted duration as the active timer duration and re-render
        this.durationMs = defaultTotalSeconds * 1000;
        this.remainingMs = this.durationMs;
        this.renderTime(this.durationMs / 1000);
        this.broadcastState('reset');
        this.timerElement.removeAttribute('is-stopped');
        this.timerElement.removeAttribute('is-running');
        this.timeElement.removeAttribute('is-stopped');
        this.timeElement.removeAttribute('is-running');
        this.updateTabStatus('reset');
        this.clearName();
    }
}
const activeTimers = [];
gameConfigs.forEach(config => {
    for (let n = 1; n <= NUM_INSTANCES; n++) {
        activeTimers.push(new GameTimer(config, n));
    }
});
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
        },
        {
            version: "v0.18.0",
            date: "2026-08-31",
            notes: "* Added 4 unique timers per game. Multiple timers per game can now be run consecutively! \n* Added Accessibility Mode! All buttons now have tooltips that appear when hovering over them. \n* Minified the javascript.\n* Remodled the Settings Buttons.\n* Closing a timer now resets all timers for that game and reverts all custom settings back to default.\n* Notifications checkbox has been converted into a button."
        },
        {
            version: "v0.18.1",
            date: "2026-09-01",
            notes: "* Overhauled the CSS for the Timers so they maintain the correct look regardless of screen size. \n* Fixed a CSS bug with the settings buttons preventing equal button sizing."
        },
        {
            version: "v0.18.2",
            date: "2026-09-01",
            notes: "* Fixed an issue where the fullscreen view was not properly separating the unique timers per game."
        },
        {
            version: "v0.19.0",
            date: "2026-09-08",
            notes: "* Changed the entire visuals of the desktop experience...in case you didn't notice.\n* Removed the 'Info Button' as the Accessibility feature replaces that purpose.\n* You can now punch Nakl...not that you want to...right?\n* Mute Alarm button has moved to the timer navigation bar.\n* Added a logo.\n* Old layout was converted into Mobile version."
        },
        {
            version: "v0.19.1",
            date: "2026-09-08",
            notes: "* Added the ability to switch back to the mobile theme from the desktop version. (Mobile version will not get a switch because mobile browsers natively provide the option to switch to desktop view for any website)"
        },
        {
            version: "v0.19.2",
            date: "2026-09-10",
            notes: "* Further improved the timer design.\n* Clicking the settings icon on the timer will open timer settings.\n* Imrpoved Logo thickness.\n* Added more badges to the footer for a cleaner asthetic.\n* Timers are now organized in the order in which you opened them.\n* Moved some colors around. \n* Fixed some issues with the settings navigation."
        },
        {
            version: "v0.19.3",
            date: "2026-09-11",
            notes: "* Fixed the broken Home button.\n* Swapped the navbar and timer game icons.\n* Added a background to the timer name similar to the time.\n* Added a Overtime Status indicator to more easily identify if Overtime is enabled per timer."
        },
        {
            version: "v0.19.4",
            date: "2026-09-15",
            notes: "* Visual changes to the exit button under timer settings.\n* Enlarged the game logo within timers.\n* Condensed the contents of the game timers to fit on smaller screens.\n* Made the OT button on the timer truly clickable.\n* Reworked the new timer function to look cleaner with only a single timer open.\n* Added the Cyberpunk TCG tourney settings."
        },
        {
            version: "v0.19.5",
            date: "2026-09-17",
            notes: "* Fixed an issue where timer settings would stay open when closing all timers.\n* Fixed an issue where the settings button would continually spin after being closed.\n* Altered the delete button on the first timer to close the timer block.\n* Added a 'new timer' button on the 4th timer slot when empty.\n* Added more Accessibility button descriptions.\n* Fixed an issue where the toggle buttons were not displaying active colors correctly.\n* "
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