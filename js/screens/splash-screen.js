import SplashView from '../views/splash-view';
import Application from '../application';

export default class SplashScreen {
  constructor() {
  }

  get element() {
    const splashView = new SplashView();

    this._view = splashView;
    this._view.start();

    return splashView.element;
  }

  stop() {
    this._view.stop();
  }

}
