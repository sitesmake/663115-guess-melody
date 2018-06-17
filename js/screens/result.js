import {createElementFromHTML, declension} from '../utils';
import {totalPoints, resultsText} from '../game';

const resultScreen = () => {
  window.gameState.totalPoints = totalPoints(window.gameState.answers);
  return createElementFromHTML(`<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали ${window.gameState.totalPoints} балл${declension(window.gameState.totalPoints, ``, `а`, `ов`)} (8 быстрых)
      <br>совершив ${window.gameState.wrongAnswers} ошиб${declension(window.gameState.wrongAnswers, `ку`, `ки`, `ок`)}</div>
    <span class="main-comparison">
      ${resultsText(window.gameState.otherPlayersResults, window.gameState)}
    </span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`);
};

export default resultScreen;
