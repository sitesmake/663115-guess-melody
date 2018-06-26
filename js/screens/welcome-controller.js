import WelcomeView from '../views/welcome-view';

export default () => {
  const welcomeController = new WelcomeView();

  welcomeController.onStartClick = () => window.showFirstGameScreen();

  return welcomeController;
};
