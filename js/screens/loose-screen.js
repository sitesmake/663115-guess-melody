import LooseView from '../views/loose-view';
import Application from '../application';

export default class LooseScreen {
  constructor(model) {
    this.model = model;
  }

  get element() {
    const looseView = new LooseView(this.model.gameState.reasonLoose);

    looseView.onRestartClick = () => Application.showWelcome();

    return looseView.element;
  }

}
