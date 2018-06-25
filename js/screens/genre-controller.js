import GenreView from '../views/genre-view';

export default (gameState) => {
  const genreController = new GenreView(gameState);

  genreController.onChangeAnswerFormElement = () => {
    const submitAnswerButton = document.querySelector(`.genre-answer-send`);
    const answerInputs = Array.from(document.querySelector(`.genre`).querySelectorAll(`input`));
    submitAnswerButton.disabled = !answerInputs.some((el) => el.checked);
  };

  genreController.onSubmitAnswerFormElement = (evt) => {
    const currentLevel = gameState.currentLevel;
    const answersElements = evt.target.querySelectorAll(`input`);
    const correctAnswer = currentLevel.questions.every((question, index) => {
      return question.correct === answersElements[index].checked;
    });
    if (correctAnswer) {
      window.correctAnswer();
    } else {
      window.wrongAnswer();
    }
  };

  return genreController;
};
