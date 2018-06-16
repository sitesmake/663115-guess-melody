import {createElementFromHTML} from '../utils';
import {headerHTML} from './header';
import {playerHTML, onPlayerControlClick} from '../audio';

const answerHTML = (item, i) => {
  return `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="val-${i}"/>
      <label class="main-answer" for="answer-${i}">
        <img class="main-answer-preview" src="${item.src}"
             alt="${item.artist}" width="134" height="134">
        ${item.artist}
      </label>
    </div>
  `;
};

const artistLevel = () => {
  const gameState = window.gameState;
  const currentLevel = window.currentLevel;

  const node = createElementFromHTML(`
    <section class="main main--level main--level-artist">
      ${headerHTML(gameState)}
      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          ${playerHTML(`${currentLevel.questionSrc}`, true)}
        </div>
        <form class="main-list">
          ${currentLevel.answers.map((answer, index) => answerHTML(answer, index)).join(``)}
        </form>
      </div>
    </section>`);

  node.querySelector(`.main-list`).addEventListener(`change`, (evt) => {
    const answerIndex = +evt.target.value.split(`-`)[1];
    if (currentLevel.answers[answerIndex].correct === true) {
      window.correctAnswer();
    } else {
      window.wrongAnswer();
    }
  });

  node.querySelector(`.player-control`).addEventListener(`click`, (evt) => {
    onPlayerControlClick(evt);
  });

  return node;
};

export default artistLevel;
