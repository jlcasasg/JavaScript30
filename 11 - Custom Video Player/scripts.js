/* Get items  */
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const fullScreen = document.querySelector('.fullscreen');



/* build functions */
function togglePlay() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

function togglePlayButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    // volumne or playbackRate
    video[this.name] = this.value;
}

function handleProgress() {
    let percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreenMode() {
    if (video.requestFullscreen)
        video.requestFullscreen();
}


/*  hook event listeners */

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', togglePlayButton);
video.addEventListener('pause', togglePlayButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(btn => {
    btn.addEventListener('click', skip);
});

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
});


let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mosemove', (e) => {
    mouseDown && scrub(e)
});

progress.addEventListener('mousedown', () => {
    mouseDown = true;
});

progress.addEventListener('mouseup', () => {
    mouseDown = false;
});

fullScreen.addEventListener('click', fullScreenMode);