import { initialCards } from './List.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

export function openPopup(element) {
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

  formValidatorProfile.clearErrors();

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
export const imagePopup = document.querySelector('.popup_type_photo');
export const imagePopupPhoto = imagePopup.querySelector('.popup__photo');
export const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupClose = imagePopup.querySelector('.popup__close');

const elements = document.querySelector('.elements');

const templateItem = document.querySelector('#card_template');


// Добавление массива карточек

initialCards.forEach((item) => {
  const card = new Card(templateItem, item.name, item.link);
  elements.appendChild(card.create());
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
  formValidatorCard.clearErrors();
  
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

const validation = {
  formSelector: '.form',
  inputSelector: '.form__box',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__box_error',
  errorClass: 'form__error_active'
};

const formValidatorProfile = new FormValidator(validation, popupProfileForm);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validation, placeForm);
formValidatorCard.enableValidation();

