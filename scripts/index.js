//Создаем переменные
const popup = document.querySelector('.popup_type_profile');

const closeEditPopup = popup.querySelector('.popup__close');

const form = popup.querySelector('.form');
const nameInput = form.querySelector('.form__box_type_name');
const jobInput = form.querySelector('.form__box_type_about');

const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__subtitle');

const profileEdit = document.querySelector('.profile__add-button');

function openPopup(element) {
  element.classList.add('popup_opened');
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

// Вызываем функцию открытия кнопки
function openPopupButton() {
  openPopup(popup);

  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
}

profileEdit.addEventListener('click', openPopupButton);
closeEditPopup.addEventListener('click', () => closePopup(popup));

// Вызываем функцию кнопки "Сохранить" и внесение новых данных
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  closePopup(popup);
}

form.addEventListener('submit', handleFormSubmit);

