import { initialCards } from './scripts/list.js';
import Card from './scripts/card.js';
import FormValidator from './scripts/FormValidator.js';

//Создаем переменные
const popupProfile = document.querySelector('.popup_type_profile');

const popupProfileCloseButton = popupProfile.querySelector('.popup__close');

const popupProfileForm = popupProfile.querySelector('.form');
const nameInput = popupProfileForm.querySelector('.form__box_type_name');
const jobInput = popupProfileForm.querySelector('.form__box_type_about');

const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__subtitle');

const profileEdit = document.querySelector('.profile__add-button');

const inputsFormEditProfileElement = popupProfileForm.querySelectorAll('.form__box');
const buttonSubmitFormEditProfileElement = popupProfileForm.querySelector('.form__save');

function openPopup(element) {
  element.classList.add('popup_opened');

  window.addEventListener('keydown', closeByEsc);
}

function closePopup(element) {
  element.classList.remove('popup_opened');

  window.removeEventListener('keydown', closeByEsc);
}

// Вызываем функцию открытия кнопки
function openPopupProfileButton() {
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;

  clearErrors(popupProfileForm, validation);
  buttonState(inputsFormEditProfileElement, buttonSubmitFormEditProfileElement, validation);

  openPopup(popupProfile);
}

function addPopupOutsideClickEvent(element) {
  element.addEventListener('mousedown', (e) => {
    const isOutside = !e.target.closest('.popup__container');

    if (isOutside) {
      closePopup(element);
    }
  });
}

profileEdit.addEventListener('click', openPopupProfileButton);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));

addPopupOutsideClickEvent(popupProfile);

// Вызываем функцию кнопки "Сохранить" и внесение новых данных
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  closePopup(popupProfile);
}

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

//Создаем переменные
const imagePopup = document.querySelector('.popup_type_photo');
const imagePopupPhoto = imagePopup.querySelector('.popup__photo');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupClose = imagePopup.querySelector('.popup__close');

const elements = document.querySelector('.elements');

const templateItem = document.querySelector('#card_template');


// Добавление массива карточек

initialCards.forEach((item) => {
  elements.appendChild(createCard(item.name, item.link));
});

// Закрытие попапа картинки на крестик

imagePopupClose.addEventListener('click', () => {
  closePopup(imagePopup);
});

// Открытие попапа добавления карточки

const addPlaceButton = document.querySelector('.profile__button');

const placePopup = document.querySelector('.popup_type_place');
const placePopupClose = placePopup.querySelector('.popup__close');

const placeForm = placePopup.querySelector('.form');

const placeFormInputs = placeForm.querySelectorAll('.form__box');
const placeFormSubmit = placeForm.querySelector('.form__save');

const placeNameInput = placeForm.querySelector('.form__box_type_name');
const placeLinkInput = placeForm.querySelector('.form__box_type_link');

placeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  elements.prepend(createCard(placeNameInput.value, placeLinkInput.value));

  placeNameInput.value = "";
  placeLinkInput.value = "";

  closePopup(placePopup);
});

addPlaceButton.addEventListener('click', () => {
  clearErrors(placeForm, validation);
  buttonState(placeFormInputs, placeFormSubmit, validation);

  placeForm.reset();

  openPopup(placePopup);
});

placePopupClose.addEventListener('click', () => closePopup(placePopup));

addPopupOutsideClickEvent(placePopup);
addPopupOutsideClickEvent(imagePopup);

// Функция закрытия попапа по клику на esc
function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

