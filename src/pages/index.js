import '../pages/index.css';

import Card from '../components/Card';
import FormValidator from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupRemoveCard from "../components/PopupRemoveCard.js";

const popupProfile = document.querySelector('.popup_type_profile');

const popupProfileForm = popupProfile.querySelector('.form');
const nameInput = popupProfileForm.querySelector('.form__box_type_name');
const jobInput = popupProfileForm.querySelector('.form__box_type_about');

const profileEdit = document.querySelector('.profile__add-button');

// Открытие попапа добавления карточки
const addPlaceButton = document.querySelector('.profile__button');

const placePopup = document.querySelector('.popup_type_place');

const editAvatarButton = document.querySelector('.profile__avatar-button');

const placeForm = placePopup.querySelector('.form');

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

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__box',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__box_error',
  errorClass: 'form__error_active'
};

const handleAvatarFormSubmit = (data) => {
  api.updateUserAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar, id: res._id });
      editAvatarPopup.close();
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    });
};

const formValidatorProfile = new FormValidator(validationConfig, popupProfileForm);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validationConfig, placeForm);
formValidatorCard.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_photo');
imagePopup.setEventListeners()

const createPlacePopup = new PopupWithForm('.popup_type_place');
createPlacePopup.setCallback(handleCardFormSubmit);
createPlacePopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_type_profile');
editProfilePopup.setCallback(handleEditFormSubmit);
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
editAvatarPopup.setCallback(handleAvatarFormSubmit);
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener('click', () => editAvatarPopup.open());

const deletePhotoPopup = new PopupRemoveCard('.popup_type_delete', (card) => {
  console.log(card);
  api.deleteCard(card.getId())
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

function handleCardFormSubmit(formData) {
  api.createNewCard({ name: formData.place, link: formData.web })
    .then((newCard) => {
      section.addItem(createCard(newCard));
      createPlacePopup.close();
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    });
}

function handleEditFormSubmit() {
  editProfilePopup.setSubmitButtonText("Загрузка...");

  api.setUserInfo({ name: nameInput.value, job: jobInput.value })
    .then(res => {
      userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar, id: res._id });
      editProfilePopup.close();
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    }).finally(() => {
      editProfilePopup.setSubmitButtonText("Сохранить")
    });
}

const handleLikeCard = (card) => {
  if (card.isLiked) {
    api.deleteLike(card.getId())
      .then(res => {
        card.updateLikes(res.likes);
      })
      .catch(errorMessage => {
        console.error(errorMessage)
      });
  } else {
    api.addLike(card.getId())
      .then(res => {
        card.updateLikes(res.likes);
      })
      .catch(errorMessage => {
        console.error(errorMessage);
      });
  }

};

// Рендер карточек

const cardsContainer = document.querySelector('.elements');

const cardTemplate = document.querySelector('#card_template');

function createCard(data) {
  const card = new Card(cardTemplate, data, handleCardClick, deletePhotoPopup.open, userInfo.getUserId(), handleLikeCard);
  return card.create();
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const rendererItems = (item) => {
  section.addItem(createCard(item));
};

const section = new Section(rendererItems, cardsContainer);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({ name: user.name, job: user.about, avatar: user.avatar, id: user._id });
    section.rendererElements(cards.reverse());
  })
  .catch(errorMessage => {
    console.error(errorMessage);
  });
