//Сщздаем переменные
const openPopup = document.querySelector('.profile__add-button');
const closePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const form = document.querySelector('.form');
const nameInput = form.querySelector('.form__box_type_name');
const jobInput = form.querySelector('.form__box_type_about');
const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__subtitle');

// Вызываем функцию открытия кнопки
 function openPopupButton() {
  popup.classList.add('popup_opened');
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
};
openPopup.addEventListener('click', openPopupButton);

//Вызываем функцию закрытия кнопки
function closePopupButton() {
  popup.classList.remove('popup_opened');
};
closePopup.addEventListener('click', closePopupButton);

// Вызываем функцию кнопки "Сохранить" и внесение новых данных
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  closePopupButton();
}
form.addEventListener('submit', handleFormSubmit);
