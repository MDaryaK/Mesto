import './pages/index.css';
import { initialCards } from './scripts/list.js';
import Card from './components/Card.js';
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";

const popupProfile = document.querySelector('.popup_type_profile');

const popupProfileForm = popupProfile.querySelector('.form');
const nameInput = popupProfileForm.querySelector('.form__box_type_name');
const jobInput = popupProfileForm.querySelector('.form__box_type_about');

const profileEdit = document.querySelector('.profile__add-button');

// Открытие попапа добавления карточки
const addPlaceButton = document.querySelector('.profile__button');

const placePopup = document.querySelector('.popup_type_place');

const placeForm = placePopup.querySelector('.form');

const placeNameInput = placeForm.querySelector('.form__box_type_name');
const placeLinkInput = placeForm.querySelector('.form__box_type_link');

addPlaceButton.addEventListener('click', () => {
  formValidatorCard.clearErrors();

  createPlacePopup.open();
});

profileEdit.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = job;

  formValidatorProfile.clearErrors();

  editProfilePopup.open();
});

// Валидация, попапы и формочки

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

const imagePopup = new PopupWithImage('.popup_type_photo');
imagePopup.setEventListeners()

const createPlacePopup = new PopupWithForm('.popup_type_place', submitCreatePlace);
createPlacePopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_type_profile', submitEditProfile);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

function submitCreatePlace() {
  elements.prepend(createCard({ name: placeNameInput.value, link: placeLinkInput.value }));

  createPlacePopup.close();
}

function submitEditProfile() {
  userInfo.setUserInfo({ name: nameInput.value, job: jobInput.value });

  editProfilePopup.close();
}

// Рендер карточек

const elements = document.querySelector('.elements');

const templateItem = document.querySelector('#card_template');

function createCard({ name, link }) {
  const card = new Card({ template: templateItem, name, link }, handleCardClick);
  return card.create();
}

function handleCardClick() {
  imagePopup.openPopup(this._name, this._link);
}

// добавление массива карточек
const section = new Section({
  elements: initialCards,
  render: (item) => {
    section.addItem(createCard(item));
  }
}, elements);

section.renderElements();
