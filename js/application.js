import {initialState} from './data/game-data';
import {renderScreen} from './utils';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './game-model';
import GameScreen from './screens/game-screen';

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
    // gameScreen.startGame();
  }

  // static showStats(stats) {
  //   const statistics = new StatsScreen(stats);
  //   changeView(statistics.element);
  // }
}
