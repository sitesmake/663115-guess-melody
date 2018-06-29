import Application from '../application.js';
import ArtistView from '../views/artist-view.js';
import GenreView from '../views/genre-view.js';
import {onPlayerControlClick} from '../audio';

export default class GameScreen {
  constructor(model) {
    this.model = model;
  }

  get element() {
    if (this.model.gameState.currentLevel.type === `genre`) {
      const genreController = new GenreView(this.model.gameState);

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
          this.model.correctAnswer();
        } else {
          this.model.wrongAnswer();
        }
        this.showNextGameStep();
      };

      genreController.onPlayerControlClick = (evt) => {
        onPlayerControlClick(evt);
      };

      return genreController.element;
    } else {
      const artistController = new ArtistView(this.model.gameState);

      artistController.onChangeAnswer = (evt) => {
        const answerIndex = +evt.target.value.split(`-`)[1];
        if (this.model.gameState.currentLevel.answers[answerIndex].correct === true) {
          this.model.correctAnswer();
        } else {
          this.model.wrongAnswer();
        }
        this.showNextGameStep();
      };

      artistController.onPlayerControlClick = (evt) => {
        onPlayerControlClick(evt);
      };

      return artistController.element;
    }
  }

  showNextGameStep() {
    if (this.model.reasonLoose) {
      Application.showLooseScreen(this.model.reasonLoose);
    } else if (this.model.gameState.currentLevel) {
      Application.showGameScreen();
    } else {
      Application.showStatisticsScreen();
    }
  }
}
