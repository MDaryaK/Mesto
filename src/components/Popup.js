class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeByEsc = this._closeByEsc.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');

    window.addEventListener('keydown', this._closeByEsc);
  }

  close() {
    this._popup.classList.remove('popup_opened');

    window.removeEventListener('keydown', this._closeByEsc);
  }

  setEventListeners() {
    this._addPopupOutsideClickEvent();
  }

  _addPopupOutsideClickEvent() {
    this._popup.addEventListener('mousedown', (e) => {
      const { classList } = e.target;

      if (
        classList.contains("popup")
        || classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

}

export default Popup;
