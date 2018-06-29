import {initialState} from './data/game-data';
import {renderScreen} from './utils';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './game-model';
import GameScreen from './screens/game-screen';
import StatisticsScreen from './screens/statistics-screen';
import LooseScreen from './screens/loose-screen';

let model;

export default class Application {
  static showWelcome() {
    model = new GameModel(initialState);
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
