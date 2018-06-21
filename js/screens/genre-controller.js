import GenreView from '../views/genre-view';

const genreScreen = new GenreView();

const currentLevel = window.currentLevel;

genreScreen.onChangeAnswerFormElement = () => {
  const submitAnswerButton = document.querySelector(`.genre-answer-send`);
  const answerInputs = Array.from(document.querySelector(`.genre`).querySelectorAll(`input`));
  submitAnswerButton.disabled = !answerInputs.some((el) => el.checked);
};

genreScreen.onSubmitAnswerFormElement = (evt) => {
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
