let globalIdCounter = 0;
const generateId = () => `player-` + globalIdCounter++;

export const playerHTML = (src, playing) => {
  const playerId = generateId();
  return `
    <div class="player">
      <audio
        id="audio-${playerId}"
        src="${src}"
        ${!playing ? `` : `autoplay`}>
      </audio>
      <button data-id="audio-${playerId}"
        class="player-control player-control--${!playing ? `play` : `pause`}">
      </button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>`;
};

export const onPlayerControlClick = (evt) => {
  const element = evt.target;
  const id = element.dataset.id;
  const audioElement = document.querySelector(`#${id}`);
  if (element.classList.contains(`player-control--play`)) {
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
