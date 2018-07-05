import {initialState} from './data/game-data';
import {renderScreen} from './utils';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './game-model';
import GameScreen from './screens/game-screen';
import StatisticsScreen from './screens/statistics-screen';
import LooseScreen from './screens/loose-screen';
import SplashScreen from './screens/splash-screen';
import ErrorView from './views/error-view';
import ConfirmView from './views/confirm-view';
import Loader from './data/loader';

let model;
let initialData;

export default class Application {
  static showSplashScreen() {
    const splash = new SplashScreen();
    renderScreen(splash);
    Loader.loadQuestions().
      then((data) => {
        initialData = data;
        return data;
      }).
      then((data) => Loader.getAllSongs(data)).
      then((songs) => Loader.loadAllSongs(songs)).
      then((promises) => Promise.all(promises)).
      then(() => Application.showWelcomeScreen()).
      catch((err) => Application.showErrorModal(err)).
      then(() => splash.stop());
  }

  static showWelcomeScreen() {
    model = new GameModel(initialState, initialData);
    const welcome = new WelcomeScreen(model);
    renderScreen(welcome);
  }

  static showGameScreen() {
    const gameScreen = new GameScreen(model);
    renderScreen(gameScreen);
  }

  static showStatisticsScreen() {
    const splash = new SplashScreen();
    renderScreen(splash);
    Loader.loadStatistics().
      then((data) => model.updateStatictics(data)).
      then(() => splash.stop()).
      then(() => renderScreen(new StatisticsScreen(model))).
      then(() => Loader.saveStatistics(model)).
      catch((err) => Application.showErrorModal(err));
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

  static showConfirmModal(onConfirm, onCancel) {
    const confirmView = new ConfirmView(onConfirm, onCancel);
    confirmView.showModal();
  }

  static restart() {
    this.showWelcomeScreen();
  }
}
