import ArtistView from '../views/artist-view';
import {onPlayerControlClick} from '../audio';

export default (gameState) => {
  const artistController = new ArtistView(gameState);

  artistController.onChangeAnswer = (evt) => {
    const answerIndex = +evt.target.value.split(`-`)[1];
    if (gameState.currentLevel.answers[answerIndex].correct === true) {
      window.correctAnswer();
    } else {
      window.wrongAnswer();
    }
  };

  artistController.onPlayerControlClick = (evt) => {
    onPlayerControlClick(evt);
  };

  return artistController;
};
