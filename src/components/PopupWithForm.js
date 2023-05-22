import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popup, callbackSubmit) {
    super(popup);

    this._callbackSubmit = callbackSubmit;
    this._currentPopup = document.querySelector(popup);
    this._formIntoPopup = this._currentPopup.querySelector('.form');
  }

  _getInputValues() {
    const inputList = this._formIntoPopup.querySelectorAll('.form__field');

    return Array.from(inputList).reduce((formData, input) => {
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

  close() {
    super.close();
    this._formIntoPopup.reset();
  }
}

export default PopupWithForm;
