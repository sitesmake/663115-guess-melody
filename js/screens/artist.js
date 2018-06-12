import {createElementFromHTML} from '../utils';
import {initialState} from '../data/game-data';
import {headerHTML} from './header';
import {playerHTML, onPlayerControlClick} from '../audio';

const level = {
  src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
  answers: [
    {
      correct: true,
      src: `http://placehold.it/134x134`,
      artist: `Пелагея`
    },
    {
      src: `http://placehold.it/134x134`,
      artist: `The Prodigy`
    },
    {
      src: `http://placehold.it/134x134`,
      artist: `Lorde`
    }
  ]
};

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

const artistLevel = (state) => {
  return createElementFromHTML(`
    <section class="main main--level main--level-artist">
      ${headerHTML(initialState)}
      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          ${playerHTML(`${state.src}`, false)}
        </div>
        <form class="main-list">
          ${state.answers.map((answer, index) => answerHTML(answer, index)).join(``)}
        </form>
      </div>
    </section>`);
};

const artistScreen = artistLevel(level);

artistScreen.querySelector(`.main-list`).addEventListener(`change`, (evt) => {
  const answerIndex = +evt.target.value.split(`-`)[1];
  if (level.answers[answerIndex].correct === true) {
    window.correctAnswer();
  } else {
    window.wrongAnswer();
  }
});

artistScreen.querySelector(`.player-control`).addEventListener(`click`, (evt) => {
  onPlayerControlClick(evt);
});

export default artistScreen;
