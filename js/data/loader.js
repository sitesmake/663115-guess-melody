import adaptServerData from './data-adapter.js';

const APP_ID = `663115999`;
const QUESTIONS_URL = `https://es.dump.academy/guess-melody/questions`;
const STATICTICS_URL = `https://es.dump.academy/guess-melody/stats/${APP_ID}`;

export const preloadedAudio = {};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const getSongsSrc = (answer) => {
  if (answer.type === `artist`) {
    return [answer.questionSrc];
  }
  return answer.questions.map((item) => item.src);
};

const loadSong = (src) => {
  return new Promise((onload) => {
    const audio = new Audio();
    audio.src = src;
    preloadedAudio[src] = audio;
    audio.addEventListener(`canplaythrough`, () => {
      onload();
    });
  });
};

export class Loader {
  static loadQuestions() {
    return fetch(QUESTIONS_URL).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => adaptServerData(data));
  }

  static loadStatistics() {
    return fetch(STATICTICS_URL).
      then(checkStatus).
      then((response) => response.json());
  }

  static saveStatistics(model) {
    if (model.gameState.visibleAnswers) {
      return true;
    }
    return fetch(STATICTICS_URL, {
      method: `POST`,
      body: JSON.stringify({
        'timeLeft': model.gameState.timeLeft,
        'points': model.gameState.totalPoints
      }),
      headers: {
        'Content-Type': `application/json`
      }
    });
  }

  static getAllSongs(data) {
    let songs = new Set();
    data.forEach((item) => {
      getSongsSrc(item).forEach((src) => songs.add(src));
    });
    return songs;
  }

  static loadAllSongs(songs) {
    return Array.from(songs).map((item) => loadSong(item));
  }
}
