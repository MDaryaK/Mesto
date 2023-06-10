//Создаем объект
class FormValidator {
  constructor(validation, form) {
    this._inputSelector = validation.inputSelector;
    this._submitButtonSelector = validation.submitButtonSelector;
    this._inactiveButtonClass = validation.inactiveButtonClass;
    this._inputErrorClass = validation.inputErrorClass;
    this._errorClass = validation.errorClass;
    this._form = form;

    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
  };

  // Функция валидации (внешний метод)
  enableValidation() {
    this._setEventListeners();
  }

  //Очитска поля ввода(внешний метод)
  clearErrors = () => {
    this._inputs.forEach((input) => {
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      this._hideError(input, errorElement);
    });

    this._form.querySelectorAll(`.${this._inputErrorClass}`).forEach(element => {
      element.classList.remove(this._inputErrorClass);
    });

    this._toggleButtonState();
  }

  //Навешиваем слушатель (внутренний метод)
  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValid(input);
        this._toggleButtonState();
      });
    });
  };

  //Показываем ошибку ввода(внутренний метод)
  _showError(input, inputs) {
    input.classList.add(this._inputErrorClass);
    inputs.classList.add(this._errorClass);
    inputs.textContent = input.validationMessage;
  }


  //Спрятали ошибку ввода (внутренний метод)
  _hideError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //Проверяем ввод от пользователя (внутренний метод)
  _checkInputValid(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);

    if (!input.validity.valid) {
      this._showError(input, errorElement);
    } else {
      this._hideError(input, errorElement);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  };

  // Соостояние кнопки (внутренний метод)
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  //Кнопка активна(внутренний метод)
  _enableButton() {
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    this._buttonSubmit.removeAttribute('disabled');
  };

  //Кнопка пассивна(внутренний метод)
  _disableButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  };
}

  export default FormValidator;
