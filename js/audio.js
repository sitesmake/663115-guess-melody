import {preloadedAudio} from './data/loader.js';

export const playerHTML = (src, playing) => {
  return `
    <div class="player">
      <button data-src="${src}"
        class="player-control player-control--${!playing ? `play` : `pause`}">
      </button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>`;
};

export const stopAllAudio = () => {
  Object.keys(preloadedAudio).forEach((src) => {
    preloadedAudio[src].pause();
  });

  document.querySelectorAll(`.player`).forEach((item) => {
    const button = item.querySelector(`button`);
    button.classList.remove(`player-control--pause`);
    button.classList.add(`player-control--play`);
  });
};

export const onPlayerControlClick = (evt) => {
  evt.preventDefault();
  const element = evt.target;
  const src = element.dataset.src;
  const audioElement = preloadedAudio[src];
  if (element.classList.contains(`player-control--play`)) {
    stopAllAudio();
    audioElement.currentTime = 0;
    audioElement.play();
    element.classList.remove(`player-control--play`);
    element.classList.add(`player-control--pause`);
  } else {
    audioElement.pause();
    element.classList.add(`player-control--play`);
    element.classList.remove(`player-control--pause`);
  }
  return false;
};
