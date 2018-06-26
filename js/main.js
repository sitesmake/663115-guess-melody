import {initialState, levels} from './data/game-data';
import {showScreen} from './screens-controller';
import {totalPoints} from './game';
import {renderScreen} from './utils';
import welcomeScreen from './screens/welcome-controller';
import artistScreen from './screens/artist-controller';
import genreScreen from './screens/genre-controller';
import resultScreen from './screens/result-controller';

let gameState;

const canContinue = () => gameState.wrongAnswers < 3;

const die = () => {
  if (!canContinue()) {
    showScreen(`loose-lives`);
  } else {
    gameState.wrongAnswers += 1;
    goNextLevel();
  }
};

const showCurrentLevel = () => {
  if (gameState.currentLevel.type === `artist`) {
    renderScreen(artistScreen(gameState));
  } else {
    renderScreen(genreScreen(gameState));
  }
};

const goNextLevel = () => {
  gameState.currentLevelIndex += 1;
  if (levels[gameState.currentLevelIndex]) {
    gameState.currentLevel = levels[gameState.currentLevelIndex];
    showCurrentLevel();
  } else {
    gameState.totalPoints = totalPoints(gameState.answers);
    renderScreen(resultScreen(gameState));
  }
};

const startGame = () => {
  gameState = Object.assign({}, initialState);
  gameState.currentLevel = levels[gameState.currentLevelIndex];
  renderScreen(welcomeScreen());
};

startGame();

window.restart = () => startGame();

window.correctAnswer = () => {
  gameState.answers.push([true, parseInt(Math.random() * 30, 10)]);
  goNextLevel();
};

window.wrongAnswer = () => {
  gameState.answers.push([false, parseInt(Math.random() * 30, 10)]);
  die();
};

window.showFirstGameScreen = () => renderScreen(artistScreen(gameState));
