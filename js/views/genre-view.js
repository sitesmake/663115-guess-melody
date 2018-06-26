import AbstractView from '../abstract-view';
import {headerHTML} from '../screens/header';
import {playerHTML} from '../audio';

const answerHTML = (item, i) => {
  const autoplay = !!(i === 0);
  return `
    <div class="genre-answer">
      <div class="player-wrapper">
        ${playerHTML(`${item.src}`, autoplay)}
      </div>
      <input type="checkbox" name="answer" value="answer-${i}" id="a-${i}">
      <label class="genre-answer-check" for="a-${i}"></label>
    </div>
  `;
};

export default class GenreView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    const currentLevel = this.gameState.currentLevel;

    return `
      <section class="main main--level main--level-genre">
        <header>
          ${headerHTML(this.gameState)}
        </header>
        <div class="main-wrap">
          <h2 class="title">${currentLevel.title}</h2>
          <form class="genre">
            ${currentLevel.questions.map((question, index) => answerHTML(question, index)).join(``)}
            <button class="genre-answer-send" type="submit" disabled>Ответить</button>
          </form>
        </div>
      </section>`;
  }

  onChangeAnswerFormElement() { }

  onSubmitAnswerFormElement() { }

  onPlayerControlClick() { }

  bind() {
    const answerFormElement = this.element.querySelector(`.genre`);

    answerFormElement.addEventListener(`change`, () => {
      this.onChangeAnswerFormElement();
    });

    answerFormElement.addEventListener(`submit`, (evt) => {
      this.onSubmitAnswerFormElement(evt);
    });

    this.element.querySelectorAll(`.player-control`).forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        this.onPlayerControlClick(evt);
      });
    });
  }
}
