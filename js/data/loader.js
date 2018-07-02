import adaptServerData from './data-adapter.js';

const APP_ID = `663115999`;
const QUESTIONS_URL = `https://es.dump.academy/guess-melody/questions`;
const STATICTICS_URL = `https://es.dump.academy/guess-melody/stats/${APP_ID}`;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Loader {
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
}
