import {initialState} from './data/game-data';
import {renderScreen} from './utils';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './game-model';
import GameScreen from './screens/game-screen';
import StatisticsScreen from './screens/statistics-screen';
import LooseScreen from './screens/loose-screen';
import SplashScreen from './screens/splash-screen';
import ErrorView from './views/error-view';
import Loader from './data/loader';

let model;

export default class Application {
  static showSplashScreen() {
    const splash = new SplashScreen();
    renderScreen(splash);
    Loader.loadQuestions().
      then((data) => Application.showWelcome(data)).
      catch((err) => Application.showErrorModal(err)).
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

  static showErrorModal(error) {
    const errorMessage = error.toString();
    const errorView = new ErrorView(errorMessage);
    errorView.showModal();
  }
}
