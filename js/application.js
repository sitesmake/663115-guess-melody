import {initialState} from './data/game-data';
import {renderScreen} from './utils';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './game-model';
import GameScreen from './screens/game-screen';
import StatisticsScreen from './screens/statistics-screen';
import LooseScreen from './screens/loose-screen';
import SplashScreen from './screens/splash-screen';
import adaptServerData from './data/data-adapter';

let model;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Application {
  static showSplashScreen() {
    const splash = new SplashScreen();
    renderScreen(splash);
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => adaptServerData(data)).
      then((data) => Application.showWelcome(data)).
      catch((err) => console.error(err)).
      then(() => splash.stop());
  }

  static showWelcome(levelsData) {
    model = new GameModel(initialState, levelsData);
    const welcome = new WelcomeScreen();
    renderScreen(welcome);
  }

  static showGameScreen() {
    const gameScreen = new GameScreen(model);
    renderScreen(gameScreen);
  }

  static showStatisticsScreen() {
    const statisticsScreen = new StatisticsScreen(model);
    renderScreen(statisticsScreen);
  }

  static showLooseScreen() {
    const looseScreen = new LooseScreen(model);
    renderScreen(looseScreen);
  }
}
