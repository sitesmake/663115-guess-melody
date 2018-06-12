import {initialState} from './data/game-data';
import {levels} from './data/levels-data';
import {showScreen} from './screens';

const changeLevel = (game, level) => {
  return Object.assign({}, game, {
    level
  });
};

const canContinue = (game) => game.wrongAnswers < 3;

const die = (game) => {
  if (!canContinue(game)) {
    throw new Error(`You can't continue anymore`);
  }

  const wrongAnswers = game.wrongAnswers + 1;

  return Object.assign({}, game, {
    wrongAnswers
  });
};

const startGame = () => {
  const game = Object.assign({}, initialState);
  showScreen(`welcome`);
};

startGame();

window.correctAnswer = () => {
  goNextLevel();
};

window.wrongAnswer = () => {
  die();
};
