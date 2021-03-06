import AbstractView from '../abstract-view';

export default class ErrorView extends AbstractView {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }

  get template() {
    return `
      <section class="modal-error modal-error__wrap">
        <div class="modal-error__inner">
          <h2 class="modal-error__title">Произошла ошибка!</h2>
          <p class="modal-error__text">Статус: ${this.message}. Пожалуйста, перезагрузите страницу.</p>
        </div>
      </section>
    `;
  }

  showModal() {
    document.querySelector(`body`).appendChild(this.element);
  }
}
