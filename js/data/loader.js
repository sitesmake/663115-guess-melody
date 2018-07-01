import adaptServerData from './data-adapter.js';

const QUESTIONS_URL = `https://es.dump.academy/guess-melody/questions`;

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
}
