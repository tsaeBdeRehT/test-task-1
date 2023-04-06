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
  let time = 0;
  let diff = 0;
  return (seconds) => {
    clearInterval(timer);
    let start = Date.now();
    console.log(start);
    let secondsRest = seconds;
    timerEl.innerText = formatTime(seconds);
    diff = (Date.now() - start) - time;
    timerIteration(diff);
    function timerIteration (diff) {
      timer = setTimeout(() => {
        timerEl.innerText = formatTime(--secondsRest);
        time += 1000;
        diff = (Date.now() - start) - time;
        if (time >= seconds*1000) {
          clearTimeout(timer);
          console.log(Date.now());
        }
        else
         timerIteration(diff);
      }, 1000-diff)

    }
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
