//Показываем ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, inputError, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
};

//Скрываем ошибку ввода
const hideInputError = (formElement, inputElement, inputError, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__box_error');
  errorElement.classList.remove('form__error_active');
  errorElement.textContent = '';
};

// Проверка валидации
const checkInputValidity = (formElement, inputElement, inputError, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputError, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputError, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

// Ативация/дезактивация кнопки при полученных данных
const toggleButtonState = (inputList, buttonElement, inactiveButton) => {
if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('form__save_inactive');
  buttonElement.disabled = true
} else {
  buttonElement.classList.remove('form__save_inactive');
  buttonElement.disabled = false
}
};

// Навешиваем слушатель
const setEventListeners = (formElement, submitButton, inactiveButton, inputError, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__box'));
  const buttonElement = formElement.querySelector('.form__save');
  toggleButtonState(inputList, buttonElement, inactiveButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputError, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButton);
    });
  });
};

// Функция валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement,
        elements.inputName,
        elements.submitButton,
        elements.inactiveButtonClass,
        elements.inputError,
        elements.errorClass);
    });
};

// Вызываем функцию с переменными
enableValidation({ formName: '.form',
inputName: '.form__box',
submitButton: '.form__save',
inactiveButton: 'form__save_inactive',
inputError: 'form__box_error',
errorClass: 'form__error_active'
});
