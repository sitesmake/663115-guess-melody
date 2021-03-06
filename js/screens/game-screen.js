import Application from '../application.js';
import ArtistView from '../views/artist-view.js';
import GenreView from '../views/genre-view.js';
import {onPlayerControlClick, stopAllAudio} from '../audio';
import {preloadedAudio} from '../data/loader.js';
import {headerHTML} from './header';

export default class GameScreen {
  constructor(model) {
    this.model = model;
  }

  get element() {
    this.startTimer();
    this._startTime = this.model.gameState.timeLeft;

    if (this.model.gameState.currentLevel.type === `genre`) {
      const genreController = new GenreView(this.model.gameState);

      preloadedAudio[this.model.gameState.currentLevel.questions[0].src].play();

      genreController.onChangeAnswerFormElement = () => {
        const submitAnswerButton = document.querySelector(`.genre-answer-send`);
        const answerInputs = Array.from(document.querySelector(`.genre`).querySelectorAll(`input`));
        submitAnswerButton.disabled = !answerInputs.some((el) => el.checked);
      };

      genreController.onSubmitAnswerFormElement = (evt) => {
        const currentLevel = this.model.gameState.currentLevel;
        const answersElements = evt.target.querySelectorAll(`input`);
        const correctAnswer = currentLevel.questions.every((question, index) => {
          return question.correct === answersElements[index].checked;
        });
        if (correctAnswer) {
          this.model.correctAnswer(this._startTime, this.model.gameState.timeLeft);
        } else {
          this.model.wrongAnswer(this._startTime, this.model.gameState.timeLeft);
        }
        this.showNextGameStep();
      };

      genreController.onPlayerControlClick = (evt) => {
        onPlayerControlClick(evt);
      };

      genreController.onRestartClick = () => {
        Application.showConfirmModal(this.stopTimer, this.startTimer);
      };

      return genreController.element;
    } else {
      const artistController = new ArtistView(this.model.gameState);

      preloadedAudio[this.model.gameState.currentLevel.questionSrc].play();

      artistController.onChangeAnswer = (evt) => {
        const answerIndex = +evt.target.value.split(`-`)[1];
        if (this.model.gameState.currentLevel.answers[answerIndex].correct === true) {
          this.model.correctAnswer(this._startTime, this.model.gameState.timeLeft);
        } else {
          this.model.wrongAnswer(this._startTime, this.model.gameState.timeLeft);
        }
        this.showNextGameStep();
      };

      artistController.onPlayerControlClick = (evt) => {
        onPlayerControlClick(evt);
      };

      artistController.onRestartClick = () => {
        Application.showConfirmModal(this.stopTimer.bind(this), this.startTimer.bind(this));
      };

      return artistController.element;
    }
  }

  showNextGameStep() {
    this.stopTimer();
    stopAllAudio();
    if (this.model.reasonLoose) {
      Application.showLooseScreen(this.model.reasonLoose);
    } else if (this.model.gameState.currentLevel) {
      Application.showGameScreen();
    } else {
      Application.showStatisticsScreen();
    }
  }

  updateHeader() {
    const headerElement = document.querySelector(`header`);
    if (headerElement) {
      headerElement.innerHTML = headerHTML(this.model.gameState);
    }
  }

  tick() {
    this.model.gameState = Object.assign({}, this.model.gameState, {
      timeLeft: this.model.gameState.timeLeft - 1
    });
    if (this.model.gameState.timeLeft < 0) {
      this.stopTimer();
      this.model.gameState.reasonLoose = `time`;
      Application.showLooseScreen();
    } else {
      this.updateHeader(this.model.gameState);
    }
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }
}
