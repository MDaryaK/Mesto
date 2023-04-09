const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const imagePopup = document.querySelector('.popup_type-photo');
const imagePopupPhoto = imagePopup.querySelector('.popup__photo');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupClose = imagePopup.querySelector('.popup__close');

const elements = document.querySelector('.elements');

const templateItem = document.querySelector('template.elements__item');

// Добавление карточек в список

const addNewItem = (name, link) => {
  const tempItem = document.createElement("div");
  tempItem.className = "elements__item";
  tempItem.appendChild(templateItem.content.cloneNode(true));

  const tempPhoto = tempItem.querySelector('.elements__photo');
  tempPhoto.src = link;
  tempPhoto.alt = name;

  tempPhoto.addEventListener("click", () => {
    imagePopupPhoto.src = link;
    imagePopupCaption.textContent = name;

    imagePopup.classList.toggle("popup_opened");
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
  imagePopup.classList.toggle("popup_opened");
});

// Открытие попапа добавления карточки

const addPlaceButton = document.querySelector('.profile__button');

const placePopup = document.querySelector('.popup_type-place');
const placePopupClose = placePopup.querySelector('.popup__close');

const placeForm = placePopup.querySelector('.form');

console.log(placeForm);

const placeNameInput = placeForm.querySelector('.form__box_type_name');
const placeLinkInput = placeForm.querySelector('.form__box_type_link');

placeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  elements.prepend(addNewItem(placeNameInput.value, placeLinkInput.value));

  placeNameInput.value = "";
  placeLinkInput.value = "";

  placePopup.classList.toggle("popup_opened");
});

addPlaceButton.addEventListener('click', () => {
  placePopup.classList.toggle("popup_opened");
});

placePopupClose.addEventListener('click', () => {
  placePopup.classList.toggle("popup_opened");
});
