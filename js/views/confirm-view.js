import AbstractView from '../abstract-view';
import Application from '../application';

const ESC_KEYCODE = 27;

export default class ConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="modal-confirm modal-confirm__wrap">
      <form class="modal-confirm__inner">
        <button class="modal-confirm__close" type="button" tabindex="3">Закрыть</button>
        <h2 class="modal-confirm__title">Подтверждение</h2>
        <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal-confirm__btn-wrap">
          <button class="modal-confirm__btn ok" tabindex="2">Ок</button>
          <button class="modal-confirm__btn cancel" tabindex="1">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  showModal() {
    document.querySelector(`body`).appendChild(this.element);
  }

  onOkClick() {
    document.removeEventListener(`keydown`, this.onEscClose);
    document.querySelector(`.modal-confirm__wrap`).remove();
    Application.restart();
  }

  onCancelClick() {
    document.removeEventListener(`keydown`, this.onEscClose);
    document.querySelector(`.modal-confirm__wrap`).remove();
  }

  onEscClose(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this.onCancelClick();
    }
  }

  bind() {
    this.element.querySelector(`.modal-confirm__btn.ok`).addEventListener(`click`, () => {
      this.onOkClick();
    });

    this.element.querySelector(`.modal-confirm__btn.cancel`).addEventListener(`click`, () => {
      this.onCancelClick();
    });

    this.element.querySelector(`.modal-confirm__close`).addEventListener(`click`, () => {
      this.onCancelClick();
    });

    document.addEventListener(`keydown`, (evt) => this.onEscClose(evt));
  }
}
