import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),

  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

refs.buttonStart.disabled = true;
refs.buttonStart.addEventListener('click', onButtonClickStartTimer);

let intervalId = null;
let startTime = 0;
let deadline = 0;

const date = new Date();
console.log(`Date now: ${Date.now()}`);

// flatpickr timer
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    startTime = selectedDates[0].getTime();
    if (startTime > date) {
      refs.daysLeft.style.color = '#000';
      refs.hoursLeft.style.color = '#000';
      refs.minutesLeft.style.color = '#000';
      refs.secondsLeft.style.color = '#000';

      refs.buttonStart.disabled = false;

      console.log(`Start time: ${startTime}`);
      return startTime;
    } else {
      Notify.warning('Please choose a date in the future', {
        position: 'center-top',
        fontSize: '14px',
      });
      // window.alert('Please choose a date in the future');
      refs.buttonStart.disabled = true;
    }
  },
});

// set interval
function onButtonClickStartTimer() {
  console.log('Start!');
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    deadline = deltaTime;
    refs.buttonStart.disabled = true;
    // console.log(`Deadline: ${deadline}`);

    convertMs(deadline);
    stopClockface(deadline);
  }, 1000);
}

// time converter
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  updateClockface({ days, hours, minutes, seconds });

  return { days, hours, minutes, seconds };
}

// interface updater
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysLeft.textContent = days;
  refs.hoursLeft.textContent = hours;
  refs.minutesLeft.textContent = minutes;
  refs.secondsLeft.textContent = seconds;
}

// stop timer
function stopClockface(ms) {
  const cutMs = Math.trunc(ms * 0.001);
  // console.log(cutMs);

  if (cutMs <= 0) {
    clearInterval(intervalId);
    Notify.failure('Finish!', {
      position: 'center-top',
      fontSize: '14px',
    });
    refs.buttonStart.disabled = true;

    refs.daysLeft.style.color = '#f00';
    refs.hoursLeft.style.color = '#f00';
    refs.minutesLeft.style.color = '#f00';
    refs.secondsLeft.style.color = '#f00';
  }
}
