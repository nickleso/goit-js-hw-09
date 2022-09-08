import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEl = document.querySelector('.form');

let delay = 0;
let delayStep = 0;
let amount = 0;

formEl.addEventListener('submit', create);
formEl.addEventListener('input', onFormInput);

function onFormInput() {
  delay = formEl.elements[0].value;
  delayStep = formEl.elements[1].value;
  amount = formEl.elements[2].value;

  return { delay, delayStep, amount };
}

function create(event) {
  event.preventDefault();

  for (let i = 0; i < amount; i += 1) {
    if (i < 1) {
      delay = Number(delay);
    } else {
      delay = Number(delay) + Number(delayStep);
    }

    createPromise(i, delay);
  }
}

function createPromise(position, delay) {
  position += 1;
  console.log(position, Number(delay));

  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
        fontSize: '14px',
      });
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
        fontSize: '14px',
      });
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
