//Создаем объект
 class FormValidator {
   constructor(validation, form) {
     this._formSelector = validation.formSelector;
     this._inputSelector = validation.inputSelector;
     this._submitButtonSelector = validation.submitButtonSelector;
     this._inactiveButtonClass = validation.inactiveButtonClass;
     this._inputErrorClass = validation.inputErrorClass;
     this._errorClass = validation.errorClass;
     this._form = form;

     this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
     this._submit = this._form.querySelector(this._submitButtonSelector);
   };

   // Функция валидации (внешний метод)
   enableValidation() {
     this._setEventListeners();
   }

   //Очитска поля ввода(внешний метод)
   clearErrors = () => {
     this._form.querySelectorAll(`.${this._errorClass}`).forEach(element => {
       element.classList.remove(this._errorClass);
     });

     this._form.querySelectorAll(`.${this._inputErrorClass}`).forEach(element => {
       element.classList.remove(this._inputErrorClass);
     });

     this._buttonState()
   }

   //Навешиваем слушатель (внутренний метод)
   _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

     this._inputs.forEach((input) => {
       input.addEventListener('input', () => {
         this._checkInputValid(input);
         this._buttonState();
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
   _hideError(input, inputs) {
     input.classList.remove(this._inputErrorClass);
     inputs.classList.remove(this._errorClass);
     inputs.textContent = '';
   };

   //Проверяем ввод от пользователя (внутренний метод)
   _checkInputValid(input) {
     const inputs = this._form.querySelector(`.${input.id}-error`);

     if (!input.validity.valid) {
       this._showError(input, inputs);
     } else {
       this._hideError(input, inputs);
     }
   }

   _hasInvalidInput() {
     return Array.from(this._list).some((input) => !input.validity.valid);
   };

   // Соостояние кнопки (внутренний метод)
   _buttonState () {
     if (this._hasInvalidInput()) {
       this._disableButton();
     }
     else {
       this._enableButton();
     }
   };

   //Кнопка активна(внутренний метод)
   _enableButton() {
     this._button.classList.remove(this._buttonClass);
     this._button.removeAttribute('disabled');
   };

   //Кнопка пассивна(внутренний метод)
   _disableButton() {
     this._button.classList.add(this._buttonClass);
     this._button.setAttribute('disabled', true);
   };
 }

   export default FormValidator;
