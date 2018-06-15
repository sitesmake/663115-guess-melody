import {initialState, levels} from './data/game-data';
import {showScreen} from './screens';

const canContinue = () => window.gameState.wrongAnswers < 3;

const die = () => {
  if (!canContinue()) {
    throw new Error(`You can't continue anymore`);
  }
  window.gameState.wrongAnswers += 1;
  goNextLevel();
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
  window.currentLevel = levels[window.gameState.currentLevelIndex];
  showCurrentLevel();
};

const startGame = () => {
  window.gameState = Object.assign({}, initialState);
  window.currentLevel = levels[window.gameState.currentLevelIndex];
  showScreen(`welcome`);
};

startGame();

window.correctAnswer = () => {
  goNextLevel();
};

window.wrongAnswer = () => {
  die();
};
