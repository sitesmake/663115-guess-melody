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

export const renderScreen = (screen) => {
  const renderElement = document.querySelector(`.main`);
  renderElement.innerHTML = ``;
  renderElement.appendChild(screen.element);
};
