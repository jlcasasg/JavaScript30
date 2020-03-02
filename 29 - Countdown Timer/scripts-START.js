let countDown;
const displayTime = document.querySelector('.display__time-left')
const displayTimeRemaind = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countDown);
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayEndTime(new Date(then));
    displayTimeLeft(seconds);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //chek if it should stopped
        if (secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        //Display!
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const text = `${minutes < 10 ? '0' + minutes : minutes}:${remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds}`;
    displayTime.textContent = text;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    displayTimeRemaind.textContent = `Be back at ${hour > 12 ? '0' + (hour - 12) : hour}:${minutes < 10 ? '0' + minutes : minutes}`
}

function setTimeout() {
    timer(this.dataset.time)
}
buttons.forEach(button => button.addEventListener('click', setTimeout))

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    timer(this.minutes.value * 60);
    this.reset();
})

