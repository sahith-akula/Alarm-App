document.getElementById('start-timer').addEventListener('click', startNewTimer);

let timers = [];

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    if (hours < 0 || minutes < 0 || seconds < 0) {
        alert('Please enter valid times.');
        return;
    }
    
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    if (totalSeconds <= 0) {
        alert('Please enter a time greater than zero.');
        return;
    }

    const timerId = Date.now();
    timers.push({ id: timerId, totalSeconds, remainingSeconds: totalSeconds });

    renderTimers();
}

function renderTimers() {
    const timerList = document.getElementById('timer-list');
    timerList.innerHTML = '';

    timers.forEach(timer => {
        const timerElement = document.createElement('li');
        timerElement.className = 'timer-item';
        timerElement.dataset.id = timer.id;

        const time = formatTime(timer.remainingSeconds);
        timerElement.innerHTML = `
            <span>${time}</span>
            <button class="stop-btn">Stop Timer</button>
        `;

        timerElement.querySelector('.stop-btn').addEventListener('click', () => stopTimer(timer.id));

        timerList.appendChild(timerElement);
    });

    timers.forEach(timer => {
        if (!timer.interval) {
            timer.interval = setInterval(() => updateTimer(timer), 1000);
        }
    });
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimer(timer) {
    if (timer.remainingSeconds > 0) {
        timer.remainingSeconds--;
        renderTimers();
    } else {
        clearInterval(timer.interval);
        playAlert();
        renderTimers();
    }
}

function stopTimer(timerId) {
    timers = timers.filter(timer => timer.id !== timerId);
    renderTimers();
}

function playAlert() {
    const audio = new Audio('path/to/your-alert-sound.mp3');
    audio.play();
}
