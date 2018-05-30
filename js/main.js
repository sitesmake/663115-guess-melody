'use strict';

const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;

const mainElement = document.querySelector(`.main`);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

const screens = Array.from(document.querySelector(`#templates`).content.querySelectorAll(`section`));

let current = 0;
const select = (index) => {
  if (index < 0) {
    current = screens.length - 1;
  } else if (index >= screens.length) {
    current = 0;
  } else {
    current = index;
  }
  selectSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

select(0);


const buttonsHTML = `<div class="arrows__wrap">
<style>
.arrows__wrap {
  position: absolute;
  top: 135px;
  left: 50%;
  margin-left: -56px;
}
.arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
}
</style>
<button id="previous-button" class="arrows__btn"><-</button>
<button id="next-button" class="arrows__btn">-></button>
</div>`;

document.querySelector(`.app`).insertAdjacentHTML(`beforeEnd`, buttonsHTML);

document.querySelector(`#previous-button`).addEventListener(`click`, function () {
  select(current - 1);
});

document.querySelector(`#next-button`).addEventListener(`click`, function () {
  select(current + 1);
});
