import looseLivesScreen from './screens/loose-lives-controller';

const screens = {
  'loose-lives': looseLivesScreen
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
