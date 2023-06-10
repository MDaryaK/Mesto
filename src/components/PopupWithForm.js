import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popup) {
    super(popup);

    this._currentPopup = document.querySelector(popup);
    this._formIntoPopup = this._currentPopup.querySelector('.form');
    this._inputList = this._formIntoPopup.querySelectorAll('.form__box');
    this._buttonSubmit = this._currentPopup.querySelector('.form__save');
  }

  setCallback(submitCb) {
    this._callbackSubmit = submitCb;
  }

  _getInputValues() {
    return Array.from(this._inputList).reduce((formData, input) => {
      formData[input.name] = input.value;
      return formData;
    }, {})
  }

  setEventListeners() {
    super.setEventListeners();

    this._formIntoPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  }

  setSubmitButtonText(text) {
    this._buttonSubmit.textContent = text;
  }

  close() {
    super.close();
    this._formIntoPopup.reset();
  }
}

export default PopupWithForm;
