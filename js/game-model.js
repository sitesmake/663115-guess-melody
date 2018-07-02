import {totalPoints} from './game';

export default class GameModel {
  constructor(gameState, levels) {
    this._gameState = gameState;
    this._levels = levels;
    this.restart();
  }

  restart() {
    this.gameState = Object.assign({}, this._gameState);
    this.setNextLevel();
  }

  setNextLevel() {
    this.gameState.currentLevelIndex += 1;
    this.gameState.currentLevel = this._levels[this.gameState.currentLevelIndex];
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

  correctAnswer(startTime, timeLeft) {
    this.gameState.answers.push([true, startTime - timeLeft]);
    this.setNextLevel();
  }

  wrongAnswer(startTime, timeLeft) {
    this.gameState.answers.push([false, startTime - timeLeft]);
    this.die();
  }

  generateStatistics() {
    this.gameState.totalPoints = totalPoints(this.gameState.answers);
  }

  updateStatictics(data) {
    this.gameState.otherPlayersResults = data;
  }
}
