import { initialCards } from './list.js';
import Card from './Card.js';
import FormValidator from "./FormValidator.js";

const popupProfile = document.querySelector('.popup_type_profile');

const popupProfileForm = popupProfile.querySelector('.form');
const nameInput = popupProfileForm.querySelector('.form__box_type_name');
const jobInput = popupProfileForm.querySelector('.form__box_type_about');

const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__subtitle');

const profileEdit = document.querySelector('.profile__add-button');

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
    const { classList } = e.target;

    if (
      classList.contains("popup")
      || classList.contains("popup__close")
    ) {
      closePopup(element);
    }
  });
}


function createCard(template, name, link) {
  const card = new Card(template, name, link);
  return card.create();
}


profileEdit.addEventListener('click', openPopupProfileButton);

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

const elements = document.querySelector('.elements');

const templateItem = document.querySelector('#card_template');

// Добавление карточек в список

initialCards.forEach((item) => {
  elements.appendChild(createCard(templateItem, item.name, item.link));
});

// Открытие попапа добавления карточки

const addPlaceButton = document.querySelector('.profile__button');

const placePopup = document.querySelector('.popup_type_place');

const placeForm = placePopup.querySelector('.form');

const placeNameInput = placeForm.querySelector('.form__box_type_name');
const placeLinkInput = placeForm.querySelector('.form__box_type_link');

placeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  elements.prepend(createCard(templateItem, placeNameInput.value, placeLinkInput.value));

  placeForm.reset();

  closePopup(placePopup);
});

addPlaceButton.addEventListener('click', () => {
  formValidatorCard.clearErrors();

  placeForm.reset();

  openPopup(placePopup);
});

addPopupOutsideClickEvent(placePopup);
addPopupOutsideClickEvent(imagePopup);

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
