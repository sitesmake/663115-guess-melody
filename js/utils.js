export const createElementFromHTML = (htmlString) => {
  const div = document.createElement(`div`);
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

export const declension = (number, one, two, five) => {
  let ending = ``;
  if (number >= 11 && number <= 19) {
    ending = five;
  } else {
    const rest = number % 10;
    if (rest === 0 || rest >= 5) {
      ending = five;
    } else if (rest >= 2) {
      ending = two;
    } else {
      ending = one;
    }
  }
  return ending;
};

const mainElement = document.querySelector(`.main`);
export const renderScreen = (screen) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screen.element);
};
