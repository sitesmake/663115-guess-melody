import AbstractView from '../abstract-view';
import {declension} from '../utils';
import {resultsText} from '../game';

export default class StatisticsView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
        <br>вы&nbsp;набрали ${this.gameState.totalPoints} балл${declension(this.gameState.totalPoints, ``, `а`, `ов`)} (8 быстрых)
        <br>совершив ${this.gameState.wrongAnswers} ошиб${declension(this.gameState.wrongAnswers, `ку`, `ки`, `ок`)}</div>
      <span class="main-comparison">
        ${resultsText(this.gameState.otherPlayersResults, this.gameState)}
      </span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  onRestartClick() { }

  bind() {
    const button = this.element.querySelector(`.main-replay`);

    button.addEventListener(`click`, () => {
      this.onRestartClick();
    });
  }
}
