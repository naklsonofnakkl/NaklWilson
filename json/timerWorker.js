let timeoutId = null;
let endTime = null;
let running = false;

function scheduleTick() {
  const remaining = endTime - Date.now();

  if (remaining <= 0) {
    self.postMessage({ type: 'alarm' });
    running = false;
    timeoutId = null;
    return;
  }

  self.postMessage({ type: 'tick', remaining });
  timeoutId = setTimeout(scheduleTick, Math.min(1000, remaining));
}

self.onmessage = function (e) {
  const { cmd, durationMs, msToChange } = e.data;

  if (cmd === 'start') {
    if (running) return;
    running = true;
    endTime = Date.now() + durationMs;
    scheduleTick();
  } else if (cmd === 'stop') {
    running = false;
    clearTimeout(timeoutId);
    timeoutId = null;
} else if (cmd === 'adjust' && running) {
    endTime += msToChange;
    clearTimeout(timeoutId);
    scheduleTick();
}};