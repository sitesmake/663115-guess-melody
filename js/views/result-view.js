import AbstractView from '../abstract-view';
import {declension} from '../utils';
import {resultsText} from '../game';

export default class ResultView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    const state = this.gameState;

    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
        <br>вы&nbsp;набрали ${state.totalPoints} балл${declension(state.totalPoints, ``, `а`, `ов`)} (8 быстрых)
        <br>совершив ${state.wrongAnswers} ошиб${declension(state.wrongAnswers, `ку`, `ки`, `ок`)}</div>
      <span class="main-comparison">
        ${resultsText(state.otherPlayersResults, state)}
      </span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

}
