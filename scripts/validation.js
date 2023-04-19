//Создаем объект
const validation = { 
formSelector: '.form',
inputSelector: '.form__box',
submitButtonSelector: '.form__save',
inactiveButtonClass: 'form__save_inactive',
inputErrorClass: 'form__box_error',
errorClass: 'form__error_active'
}

// Функция валидации
const enableValidation = ({ formSelector, ...object }) => {
  Array.from(
    document.querySelectorAll(formSelector)
  ).forEach((form) => {
    setEventListeners(form, object);
  });
}

//Очитска поля ввода
const clearErrors = (form, { errorClass, inputErrorClass }) => {
  form.querySelectorAll(`.${errorClass}`).forEach(element => {
    element.classList.remove(errorClass);
  });

  form.querySelectorAll(`.${inputErrorClass}`).forEach(element => {
    element.classList.remove(inputErrorClass);
  });
}

//Навешиваем слушатель
const setEventListeners = (form, { inputSelector, submitButtonSelector, ...object }) => {
  const inputs = Array.from(
    form.querySelectorAll(inputSelector)
  );

  const submit = form.querySelector(submitButtonSelector);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValid(input, object);
      buttonState(inputs, submit, object);
    });
  });
};

//Показываем ошибку ввода
const showError = (input, error, { inputErrorClass, errorClass }) => {
  input.classList.add(inputErrorClass);
  error.classList.add(errorClass);
  error.textContent = input.validationMessage;
};

//Спрятали ошибку ввода
const hideError = (input, error, { inputErrorClass, errorClass }) => {
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
};


//Проверяем ввод от пользователя
const checkInputValid = (input, object) => {
  const inputs = document.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    showError(input, inputs, object);
  } else {
    hideError(input, inputs, object);
  }
};

const hasInvalidInput = ((list) => {
  return Array.from(list).some((input) => !input.validity.valid);
});

const buttonState = (list, button, { inactiveButtonClass }) => {
  if (hasInvalidInput(list)) {
    disableButton(button, inactiveButtonClass);
  }
  else {
    enableButton(button, inactiveButtonClass);
  }
};

const enableButton = (button, buttonClass) => {
  button.classList.remove(buttonClass);
  button.removeAttribute('disabled');
};

const disableButton = (button, buttonClass) => {
  button.classList.add(buttonClass);
  button.setAttribute('disabled', true);
}

// Вызываем функцию с переменными
enableValidation(validation);
