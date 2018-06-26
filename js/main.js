import {initialState, levels} from './data/game-data';
import {showScreen} from './screens-controller';
import {totalPoints} from './game';
import {renderScreen} from './utils';
import welcomeScreen from './screens/welcome-controller';
import artistScreen from './screens/artist-controller';
import genreScreen from './screens/genre-controller';
import resultScreen from './screens/result-controller';
import {headerHTML} from './screens/header';

let gameState;
let timer;

const canContinue = () => gameState.wrongAnswers < 3;

const die = () => {
  if (!canContinue()) {
    stopTimer(timer);
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
    stopTimer(timer);
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

window.showFirstGameScreen = () => {
  startTimer();
  renderScreen(artistScreen(gameState));
};

const updateHeader = (state) => {
  const headerElement = document.querySelector(`header`);
  headerElement.innerHTML = headerHTML(state);
};

const tick = () => {
  gameState = Object.assign({}, gameState, {
    timeLeft: gameState.timeLeft - 1
  });
  updateHeader(gameState);
};

const startTimer = () => {
  timer = setTimeout(() => {
    tick();
    startTimer();
  }, 1000);
};

const stopTimer = () => {
  clearTimeout(timer);
};
