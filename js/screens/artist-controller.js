import ArtistView from '../views/artist-view';
import {onPlayerControlClick} from '../audio';

const artistScreen = new ArtistView();

artistScreen.onChangeAnswer = (evt) => {
  const answerIndex = +evt.target.value.split(`-`)[1];
  if (window.currentLevel.answers[answerIndex].correct === true) {
    window.correctAnswer();
  } else {
    window.wrongAnswer();
  }
};

artistScreen.onPlayerControlClick = (evt) => {
  onPlayerControlClick(evt);
};

export default artistScreen;
