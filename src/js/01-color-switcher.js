const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

const COLOR_SWITCHER_DELAY = 1000;
let intervalId = 1;
refs.buttonStop.disabled = true;

refs.buttonStart.addEventListener('click', onButtonClickStartSwitcher);
refs.buttonStop.addEventListener('click', onButtonClickStopSwitcher);

function onButtonClickStartSwitcher() {
  intervalId = setInterval(colorSwitcher, COLOR_SWITCHER_DELAY);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;

  console.log('start');
}

function onButtonClickStopSwitcher() {
  clearInterval(intervalId);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
  console.log('Stop');
}

function colorSwitcher() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
  console.log(`Current color HEX ${randomColor}`);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
