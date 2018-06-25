import ArtistView from '../views/artist-view';
import {onPlayerControlClick} from '../audio';

export default (gameState) => {
  const artistScreen = new ArtistView(gameState);

  artistScreen.onChangeAnswer = (evt) => {
    const answerIndex = +evt.target.value.split(`-`)[1];
    if (gameState.currentLevel.answers[answerIndex].correct === true) {
      window.correctAnswer();
    } else {
      window.wrongAnswer();
    }
  };

  artistScreen.onPlayerControlClick = (evt) => {
    onPlayerControlClick(evt);
  };

  return artistScreen;
};
