import AbstractView from '../abstract-view';

export default class LooseView extends AbstractView {
  constructor(reason) {
    super();
    this.reason = reason;
  }

  get template() {
    let message;
    if (this.reason === `time`) {
      message = `Время вышло!<br>Вы не успели отгадать все мелодии`;
    } else {
      message = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
    }

    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">${message}</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  }

  onRestartClick() { }

  bind() {
    const button = this.element.querySelector(`.main-replay`);

    button.addEventListener(`click`, () => {
      this.onRestartClick();
    });
  }
}
