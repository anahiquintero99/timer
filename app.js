//DOM Elements
const form = document.querySelector('form');
const hoursLabel = document.querySelector('.hours');
const minutesLabel = document.querySelector('.minutes');
const secondsLabel = document.querySelector('.seconds');

//Enums
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_AN_MINUTE = 60;
const SECOND = 1000;

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
  let totalSecond = getSeconds();
  formatSecond(totalSecond);

  const intervalId = setInterval(() => {
    totalSecond--;
    formatSecond(totalSecond);
    if (!totalSecond) clearInterval(intervalId);
  }, SECOND);
}

form.addEventListener('submit', startTimer);
