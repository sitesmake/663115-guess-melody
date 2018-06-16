import {initialState, levels} from './data/game-data';
import {showScreen} from './screens';

const canContinue = () => window.gameState.wrongAnswers < 3;

const die = () => {
  if (!canContinue()) {
    showScreen(`loose-lives`);
  } else {
    window.gameState.wrongAnswers += 1;
    goNextLevel();
  }
};

const showCurrentLevel = () => {
  if (window.currentLevel.type === `artist`) {
    showScreen(`artist`);
  } else {
    showScreen(`genre`);
  }
};

const goNextLevel = () => {
  window.gameState.currentLevelIndex += 1;
  if (levels[window.gameState.currentLevelIndex]) {
    window.currentLevel = levels[window.gameState.currentLevelIndex];
    showCurrentLevel();
  } else {
    showScreen(`result`);
  }
};

const startGame = () => {
  window.gameState = Object.assign({}, initialState);
  window.currentLevel = levels[window.gameState.currentLevelIndex];
  showScreen(`welcome`);
};

startGame();

window.restart = () => startGame();

window.correctAnswer = () => {
  window.gameState.answers.push([true, parseInt(Math.random() * 30, 10)]);
  goNextLevel();
};

window.wrongAnswer = () => {
  window.gameState.answers.push([false, parseInt(Math.random() * 30, 10)]);
  die();
};
