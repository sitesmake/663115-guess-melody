import WelcomeView from '../views/welcome-view';
import Application from '../application';

export default class WelcomeScreen {
  constructor(model) {
    this.model = model;
  }

  get element() {
    const welcomeView = new WelcomeView();

    welcomeView.onStartClick = (visibleAnswers) => {
      this.model.gameState.visibleAnswers = visibleAnswers;
      Application.showGameScreen();
    };

    return welcomeView.element;
  }

}
