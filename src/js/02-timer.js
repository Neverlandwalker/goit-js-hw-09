import flatpickr from 'flatpickr';
// Импорт стилей flatpickr
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  daysElement: document.querySelector('span[data-days]'),
  hourseElement: document.querySelector('span[data-hours]'),
  minutesElement: document.querySelector('span[data-minutes]'),
  secondsElement: document.querySelector('span[data-seconds]'),
};
// Конструктор
class backCounter {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }
 // Finishtime Function 
  start(finishTime) {
    this.intervalId = setInterval(() => {
      const timeToFinish = this.convertMs(finishTime - Date.now());
      const { days, hours, minutes, seconds } = timeToFinish;
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(this.intervalId);
      }
      this.onTick(
        this.addLeadingZero(days),
        this.addLeadingZero(hours),
        this.addLeadingZero(minutes),
        this.addLeadingZero(seconds)
      );
    }, 1000);
  }
 // Обробник даних по часу
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
// додавання 0 перед числами <10
  addLeadingZero(value = '') {
    return String(value).padStart(2, '0');
  }
}

let finishTime = {};

function initIntrerface(
  days = '00',
  hours = '00',
  minutes = '00',
  seconds = '00'
) {
  refs.daysElement.textContent = days;
  refs.hourseElement.textContent = hours;
  refs.minutesElement.textContent = minutes;
  refs.secondsElement.textContent = seconds;
  // if (timer.isActive) 
  refs.startButton.disabled = true;
  refs.dateInput.disabled = true;
  
}

const timer = new backCounter({ onTick: initIntrerface });

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    if (currentDate < selectedDates[0]) {
      refs.startButton.disabled = false;
      finishTime = selectedDates[0];
    } else {
      refs.startButton.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.dateInput, options);

refs.startButton.disabled = true;
refs.startButton.classList.add('btn-counter');

refs.startButton.addEventListener('click', () => {
  timer.start(finishTime);
});