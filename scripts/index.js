//Создаем переменные
const popup = document.querySelector('.popup_type_profile');

const closeEditPopup = popup.querySelector('.popup__close');

const form = popup.querySelector('.form');
const nameInput = form.querySelector('.form__box_type_name');
const jobInput = form.querySelector('.form__box_type_about');

const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__subtitle');

const profileEdit = document.querySelector('.profile__add-button');

const inputsFormEditProfileElement = form.querySelectorAll('.form__box');
const buttonSubmitFormEditProfileElement = form.querySelector('.form__save');

function openPopup(element) {
  element.classList.add('popup_opened');
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

// Вызываем функцию открытия кнопки
function openPopupButton() {
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
  clearErrors(form, validation);
  buttonState(inputsFormEditProfileElement, buttonSubmitFormEditProfileElement, validation);

  openPopup(popup);
}

function addPopupOutsideClickEvent(element) {
  element.addEventListener('click', (e) => {
    const isOutside = !e.target.closest('.popup__container');

    if (isOutside) {
      closePopup(element);
    }
  });
}

profileEdit.addEventListener('click', openPopupButton);
closeEditPopup.addEventListener('click', () => closePopup(popup));

addPopupOutsideClickEvent(popup);

// Вызываем функцию кнопки "Сохранить" и внесение новых данных
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  closePopup(popup);
}

form.addEventListener('submit', handleFormSubmit);

//Создаем переменные
const imagePopup = document.querySelector('.popup_type_photo');
const imagePopupPhoto = imagePopup.querySelector('.popup__photo');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupClose = imagePopup.querySelector('.popup__close');

const elements = document.querySelector('.elements');

const templateItem = document.querySelector('#card_template');

// Добавление карточек в список

const addNewItem = (name, link) => {
  const tempItem = templateItem.content.querySelector('.elements__item').cloneNode(true);

  const tempPhoto = tempItem.querySelector('.elements__photo');
  tempPhoto.src = link;
  tempPhoto.alt = name;

  tempPhoto.addEventListener("click", () => {
    imagePopupPhoto.src = link;
    imagePopupPhoto.alt = name;

    imagePopupCaption.textContent = name;

    openPopup(imagePopup);
  });

  const tempTitle = tempItem.querySelector('.elements__title');
  tempTitle.textContent = name;

  const tempTrash = tempItem.querySelector('.elements__trash');
  tempTrash.addEventListener("click", () => {
    tempItem.remove();
  });

  const tempLike = tempItem.querySelector('.elements__like');
  tempLike.addEventListener("click", () => {
    tempLike.classList.toggle("elements__like_active");
  });

  return tempItem;
};

initialCards.forEach((item) => {
  elements.appendChild(addNewItem(item.name, item.link));
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

  elements.prepend(addNewItem(placeNameInput.value, placeLinkInput.value));

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

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closePopup(popup);
    closePopup(placePopup);
    closePopup(imagePopup);
  }
});

