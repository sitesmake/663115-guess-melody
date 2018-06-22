import GenreView from '../views/genre-view';

const genreScreen = new GenreView();

genreScreen.onChangeAnswerFormElement = () => {
  const submitAnswerButton = document.querySelector(`.genre-answer-send`);
  const answerInputs = Array.from(document.querySelector(`.genre`).querySelectorAll(`input`));
  submitAnswerButton.disabled = !answerInputs.some((el) => el.checked);
};

genreScreen.onSubmitAnswerFormElement = (evt) => {
  const currentLevel = window.currentLevel;
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

export default genreScreen;
