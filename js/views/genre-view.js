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

export default class ArtistView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    const currentLevel = window.currentLevel;

    return `
      <section class="main main--level main--level-genre">
        ${headerHTML()}
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

  bind() {
    const answerFormElement = this.element.querySelector(`.genre`);

    answerFormElement.addEventListener(`change`, () => {
      this.onChangeAnswerFormElement();
    });

    answerFormElement.addEventListener(`submit`, (evt) => {
      this.onSubmitAnswerFormElement(evt);
    });
  }
}
