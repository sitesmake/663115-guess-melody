import LooseView from '../views/loose-view';
import Application from '../application';

export default class LooseScreen {
  constructor() {
  }

  get element() {
    const looseView = new LooseView();

    looseView.onRestartClick = () => Application.showWelcome();

    return looseView.element;
  }

}
