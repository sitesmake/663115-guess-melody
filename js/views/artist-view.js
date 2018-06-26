import AbstractView from '../abstract-view';
import {headerHTML} from '../screens/header';
import {playerHTML} from '../audio';

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

export default class ArtistView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    const currentLevel = this.gameState.currentLevel;

    return `
      <section class="main main--level main--level-artist">
        <header>
          ${headerHTML(this.gameState)}
        </header>
        <div class="main-wrap">
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper">
            ${playerHTML(`${currentLevel.questionSrc}`, true)}
          </div>
          <form class="main-list">
            ${currentLevel.answers.map((answer, index) => answerHTML(answer, index)).join(``)}
          </form>
        </div>
      </section>`;
  }

  onChangeAnswer() { }

  onPlayerControlClick() { }

  bind() {
    this.element.querySelector(`.main-list`).addEventListener(`change`, (evt) => {
      this.onChangeAnswer(evt);
    });

    this.element.querySelector(`.player-control`).addEventListener(`click`, (evt) => {
      this.onPlayerControlClick(evt);
    });
  }
}
