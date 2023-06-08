import Card from './Card.js';
import FormValidator from "./validate.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import PopupRemoveCard from "./PopupRemoveCard.js";

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

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'd04afa61-1239-4cd9-8e4f-6ea23509e870',
    'Content-Type': 'application/json'
  }
});

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

const deletePhotoPopup = new PopupRemoveCard('.popup_type_delete', ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      deletePhotoPopup.close();
    })
    .catch(errorMessage => {
      console.error(errorMessage)
    })
});
deletePhotoPopup.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__photo');

function submitCreatePlace() {
  api.createNewCard({ name: placeNameInput.value, link: placeLinkInput.value })
    .then((newCard) => {
      section.addItem(createCard(newCard));
      createPlacePopup.close();
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    });
}

function submitEditProfile() {
  api.setUserInfo({ name: nameInput.value, job: jobInput.value })
    .then(res => {
      userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar, id: res._id });
      editProfilePopup.close();
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    });
}

const handleLikeCard = (card, itemLike, cardId) => {
  if (itemLike.classList.contains('elements__like_active')) {
    api.deleteLike(cardId)
      .then(res => {
        card.isLike(res.likes);
      })
      .catch(errorMessage => {
        console.error(errorMessage)
      });
  } else {
    api.addLike(cardId)
      .then(res => {
        card.isLike(res.likes);
      })
      .catch(errorMessage => {
        console.error(errorMessage);
      });
  }

};

// Рендер карточек

const elements = document.querySelector('.elements');

const templateItem = document.querySelector('#card_template');

function createCard(data) {
  const card = new Card(templateItem,data, handleCardClick, deletePhotoPopup.open, userInfo.getUserId(), handleLikeCard);
  return card.create();
}

function handleCardClick() {
  imagePopup.open(this._name, this._link);
}

const rendererItems = (item) => {
  section.addItem(createCard(item));
};

const section = new Section(rendererItems, elements);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({ name: user.name, job: user.about, avatar: user.avatar, id: user._id });
    section.rendererElements(cards.reverse());
  })
  .catch(errorMessage => {
    console.error(errorMessage);
  });
