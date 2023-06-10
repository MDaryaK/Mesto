import Popup from "./Popup.js";

export default class PopupRemoveCard extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._formIntoPopup = this._popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._formIntoPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._cardElement);
    });
  }

  open = (card) => {
    super.open();
    this._cardElement = card;
  }
}
