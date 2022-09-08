const refs = {
  formEl: document.querySelector('.form'),
};

let position = 0;
let delay = 0;
let delayStep = 0;
let amount = 0;

refs.formEl.addEventListener('submit', create);
// refs.formEl.addEventListener('submit', createPromise);
refs.formEl.addEventListener('input', onFormInput);

function onFormInput() {
  delay = refs.formEl.elements[0].value;
  delayStep = refs.formEl.elements[1].value;
  amount = refs.formEl.elements[2].value;

  return { delay, delayStep, amount };
}

function create(event) {
  event.preventDefault();

  for (let i = 0; i < amount; i += 1) {
    delay = Number(delay) + Number(delayStep);
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
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
