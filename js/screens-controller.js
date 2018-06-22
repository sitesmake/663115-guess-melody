import welcomeScreen from './screens/welcome-controller';
import genreScreen from './screens/genre-controller';
import artistScreen from './screens/artist-controller';
import resultScreen from './screens/result-controller';

const screens = {
  'welcome': welcomeScreen,
  'genre': genreScreen,
  'artist': artistScreen,
  'result': resultScreen
};

const mainElement = document.querySelector(`.main`);
export const showScreen = (name) => {
  const screen = screens[name];
  mainElement.innerHTML = ``;
  mainElement.appendChild(screen.element);
};

document.addEventListener(`click`, (evt) => {
  if (evt.target.closest(`.play-again`) || evt.target.className === `main-replay`) {
    window.restart();
  }
});
