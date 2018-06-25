import WelcomeView from '../views/welcome-view';

export default (gameState) => {
  const welcomeController = new WelcomeView(gameState);

  welcomeController.onStartClick = () => window.showFirstGameScreen();

  return welcomeController;
};
