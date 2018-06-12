import {createElementFromHTML} from '../utils';
import {showScreen} from '../screens';
import {initialState} from '../data/game-data';
import {headerHTML} from './header';
import {playerHTML, onPlayerControlClick} from '../audio';

const level = {
  title: `Выберите инди-рок треки`,
  questions: [
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      correct: true
    },
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
      correct: false
    },
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
      correct: true
    },
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
      correct: false
    }
  ]
};

const answerHTML = (item, i) => {
  return `
    <div class="genre-answer">
      <div class="player-wrapper">
        ${playerHTML(`${item.src}`, false)}
      </div>
      <input type="checkbox" name="answer" value="answer-${i}" id="a-${i}">
      <label class="genre-answer-check" for="a-${i}"></label>
    </div>
  `;
};

const genreLevel = (state) => {
  return createElementFromHTML(`
    <section class="main main--level main--level-genre">
      ${headerHTML(initialState)}
      <div class="main-wrap">
        <h2 class="title">${state.title}</h2>
        <form class="genre">
          ${state.questions.map((question, index) => answerHTML(question, index)).join(``)}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>
  `);
};

const genreScreen = genreLevel(level);

const answerFormElement = genreScreen.querySelector(`.genre`);

answerFormElement.addEventListener(`change`, () => {
  const submitAnswerButton = document.querySelector(`.genre-answer-send`);
  const answerInputs = Array.from(answerFormElement.querySelectorAll(`input`));
  submitAnswerButton.disabled = !answerInputs.some((el) => el.checked);
});

answerFormElement.addEventListener(`submit`, () => {
  showScreen(`artist`);
});

genreScreen.querySelectorAll(`.player-control`).forEach((el) => {
  el.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    onPlayerControlClick(evt);
  });
});

export default genreScreen;
