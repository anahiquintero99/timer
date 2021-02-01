//DOM Elements
const form = document.querySelector('form');
const hoursLabel = document.querySelector('.hours');
const minutesLabel = document.querySelector('.minutes');
const secondsLabel = document.querySelector('.seconds');
const btnStop = document.querySelector('.btn-stop');
const btnSpause = document.querySelector('.btn-pause');


//Enums
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_AN_MINUTE = 60;
const SECOND = 1000;

let intervalId = null;
let totalSecondsRemaining = 0;
let progressBar = null;
let totalSeconds = 0;

function formatTwoDigits(number) {
  return number < 10 ? `0${number}` : number;
}

/**
 * Transform seconds to hours, minutes and seconds
 *
 * @param {Number} seconds - The total of seconds.
 */
function formatSecond(totalSecond) {
  const hours = parseInt(totalSecond / SECONDS_IN_AN_HOUR);
  const totalSeconsMinusHours = totalSecond % SECONDS_IN_AN_HOUR;
  const minutes = parseInt( totalSeconsMinusHours / SECONDS_IN_AN_MINUTE);
  const seconds = parseInt( totalSeconsMinusHours % SECONDS_IN_AN_MINUTE);

  hoursLabel.textContent = formatTwoDigits(hours);
  minutesLabel.textContent = formatTwoDigits(minutes);
  secondsLabel.textContent = formatTwoDigits(seconds);
}

/**
 * Transform hours, minutes and seconds to seconds.
 */
function getSeconds () {
  const hours = Number(form.hours.value);
  const minutes = Number(form.minutes.value);
  const seconds = Number(form.seconds.value);

  if (!hours && !minutes && !seconds) return 0;

  const hoursInSeconds = hours * SECONDS_IN_AN_HOUR;
  const minutesInSeconds = minutes * SECONDS_IN_AN_MINUTE;

  return hoursInSeconds + minutesInSeconds + seconds;
}

/**
 * Initialize timer with the value provided by user.
 *
 * @param {SubmiEvent} event
 */
function startTimer(event) {
  event.preventDefault();
  totalSeconds = totalSecondsRemaining = getSeconds();

  if (!totalSecondsRemaining) {
    alert('You need to set at least 1 second');
    return;
  }

  formatSecond(totalSecondsRemaining);
  clearIntervalId();
  drawProgressBar();
  startInterval();
}

function stopTimer() {
  clearIntervalId();
  totalSecondsRemaining = 0;
  formatSecond(totalSecondsRemaining);
}

function pauseTimer() {
  if (intervalId) {
    clearIntervalId();
    btnSpause.textContent = 'Continue';
  } else {
    btnSpause.textContent = 'Pause';
    if (totalSecondsRemaining) startInterval();
  }
}

function clearIntervalId() {
  clearInterval(intervalId);
  intervalId = null;
}

function startInterval() {
  intervalId = setInterval(() => {
    totalSecondsRemaining--;
    formatSecond(totalSecondsRemaining);
    drawProgressBar();
    if (!totalSecondsRemaining) stopTimer();
  }, SECOND);
}

function drawProgressBar() {
  if (!progressBar) {
    progressBar = new ProgressBar.Circle('.progress-bar-custom', {
      color: '#14caf0',
      duration: 100,
      strokeWidth: 10,
      fill: '#f8f9fa',
    });
  }
  const progress = totalSecondsRemaining / totalSeconds;
  progressBar.animate(progress);
}

form.addEventListener('submit', startTimer);
btnStop.addEventListener('click', stopTimer);
btnSpause.addEventListener('click', pauseTimer);
