import WelcomeView from '../views/welcome-view';

const welcomeScreen = new WelcomeView();
welcomeScreen.onStartClick = () => window.showFirstGameScreen();

export default welcomeScreen;
