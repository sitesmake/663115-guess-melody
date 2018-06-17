import welcomeScreen from './screens/welcome';
import genreScreen from './screens/genre';
import artistScreen from './screens/artist';
import resultScreen from './screens/result';
import looseLivesScreen from './screens/loose-lives';
import looseTimeScreen from './screens/loose-time';

const screens = {
  'welcome': welcomeScreen,
  'genre': genreScreen,
  'artist': artistScreen,
  'result': resultScreen,
  'loose-lives': looseLivesScreen,
  'loose-time': looseTimeScreen
};

const mainElement = document.querySelector(`.main`);
export const showScreen = (name) => {
  const screen = screens[name];
  mainElement.innerHTML = ``;
  mainElement.appendChild(screen());
};

document.addEventListener(`click`, (evt) => {
  if (evt.target.closest(`.play-again`) || evt.target.className === `main-replay`) {
    window.restart();
  }
});
