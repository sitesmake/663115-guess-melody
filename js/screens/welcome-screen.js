import WelcomeView from '../views/welcome-view';
import Application from '../application';

export default class WelcomeScreen {
  constructor() {
  }

  get element() {
    const welcomeView = new WelcomeView();

    welcomeView.onStartClick = () => Application.showGameScreen();

    return welcomeView.element;
  }

}
