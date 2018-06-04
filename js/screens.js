import welcomeScreen from './screens/welcome';
import genreScreen from './screens/genre';
import artistScreen from './screens/artist';
import winScreen from './screens/win';
import looseLivesScreen from './screens/loose-lives';
import looseTimeScreen from './screens/loose-time';

const screens = {
  'welcome': welcomeScreen,
  'genre': genreScreen,
  'artist': artistScreen,
  'win': winScreen,
  'loose-lives': looseLivesScreen,
  'loose-time': looseTimeScreen
};

const mainElement = document.querySelector(`.main`);
export const showScreen = (name) => {
  const element = screens[name];
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

document.addEventListener(`click`, (evt) => {
  if (evt.target.closest(`.play-again`) || evt.target.className === `main-replay`) {
    showScreen(`welcome`);
  }
});
