const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTime = (seconds) => {
  let hours = Math.floor(seconds / 3600) < 10 ? `0${Math.floor(seconds / 3600)}` : Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60) < 10 ? `0${Math.floor((seconds % 3600) / 60)}` : Math.floor((seconds % 3600) / 60);
  let sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

  return `${hours}:${minutes}:${sec}`
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timer;
  return (seconds) => {
    clearInterval(timer);
    let start = Date.now();
    let time = 0;
    let diff = 0;
    timerEl.innerText = formatTime(seconds--);

    timer = setInterval(() => {
      timerEl.innerText = formatTime(seconds--);
      time += 1000;
      diff = (Date.now() - start) - time;
    }, 1000 - diff);
    setInterval(() => clearInterval(timer), (seconds+1)*1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  const formatArray = inputEl.value.match(/[0-9]/g);
  inputEl.value = formatArray === null ? '' : formatArray.join('');
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);

  inputEl.value = '';
});
