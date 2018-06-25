import WelcomeView from '../views/welcome-view';

export default (gameState) => {
  const welcomeScreen = new WelcomeView(gameState);

  welcomeScreen.onStartClick = () => window.showFirstGameScreen();

  return welcomeScreen;
};
