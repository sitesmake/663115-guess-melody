import {createElementFromHTML} from '../utils';
import {headerHTML} from './header';
import {playerHTML, onPlayerControlClick} from '../audio';

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

const genreLevel = () => {
  const gameState = window.gameState;
  const currentLevel = window.currentLevel;

  const node = createElementFromHTML(`
    <section class="main main--level main--level-genre">
      ${headerHTML(gameState)}
      <div class="main-wrap">
        <h2 class="title">${currentLevel.title}</h2>
        <form class="genre">
          ${currentLevel.questions.map((question, index) => answerHTML(question, index)).join(``)}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>
  `);

  const answerFormElement = node.querySelector(`.genre`);

  answerFormElement.addEventListener(`change`, () => {
    const submitAnswerButton = document.querySelector(`.genre-answer-send`);
    const answerInputs = Array.from(answerFormElement.querySelectorAll(`input`));
    submitAnswerButton.disabled = !answerInputs.some((el) => el.checked);
  });

  answerFormElement.addEventListener(`submit`, () => {
    if (Math.random() > 0.5) {
      window.correctAnswer();
    } else {
      window.wrongAnswer();
    }
  });

  node.querySelectorAll(`.player-control`).forEach((el) => {
    el.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      onPlayerControlClick(evt);
    });
  });

  return node;
};

export default genreLevel;
