const addPaddingZero = (n) => n < 9 ? `0` + n : n;
const getMinutes = (time) => addPaddingZero(Math.floor(time / 60));
const getSeconds = (time) => addPaddingZero(Math.floor(time % 60));

export const headerHTML = (state) => {
  return `
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${getMinutes(state.timeLeft)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${getSeconds(state.timeLeft)}</span>
      </div>
    </svg>
    <div class="main-mistakes">
      ${new Array(state.wrongAnswers)
        .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
        .join(``)}
    </div>
  `;
};
