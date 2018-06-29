import {levels} from './data/game-data';
import {totalPoints} from './game';

export default class GameModel {
  constructor(gameState) {
    this._gameState = gameState;
    this.restart();
  }

  restart() {
    this.gameState = Object.assign({}, this._gameState);
    this.setNextLevel();
  }

  setNextLevel() {
    this.gameState.currentLevelIndex += 1;
    this.gameState.currentLevel = levels[this.gameState.currentLevelIndex];
  }

  canContinue() {
    return this.gameState.wrongAnswers < 3;
  }

  die() {
    this.gameState.wrongAnswers += 1;

    if (!this.canContinue()) {
      this.reasonLoose = `lives`;
    } else {
      this.setNextLevel();
    }
  }

  correctAnswer() {
    this.gameState.answers.push([true, parseInt(Math.random() * 30, 10)]);
    this.setNextLevel();
  }

  wrongAnswer() {
    this.gameState.answers.push([false, parseInt(Math.random() * 30, 10)]);
    this.die();
  }

  generateStatistics() {
    this.gameState.totalPoints = totalPoints(this.gameState.answers);
  }
}
