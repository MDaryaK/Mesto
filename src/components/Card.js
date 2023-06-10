class Card {
  constructor(template, cardData, handleCardClick, onClickDeleteCard, userId, handleLikeCard) {
    // console.log("cardData", cardData);
    this._userId = userId;

    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;

    this._card = template.content.querySelector('.elements__item').cloneNode(true);
    this._buttonLike = this._card.querySelector('.elements__like');
    this._buttonDelete = this._card.querySelector('.elements__trash');
    this._title = this._card.querySelector('.elements__title');
    this._photo = this._card.querySelector('.elements__photo');
    this._likesCounter = this._card.querySelector('.elements__counter');

    this.handleCardClick = handleCardClick;
    this._onClickDeleteCard = onClickDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  create() {
    this._photo.src = this._link;
    this._photo.alt = this._name;

    this._title.textContent = this._name;

    this._addEventListeners();

    this._checkLikes();
    this._checkDeleteButtonVisibility();

    return this._card;
  }

  getId() {
    return this._cardId;
  }

  _checkDeleteButtonVisibility() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
  }

  _addEventListeners() {
    this._photo.addEventListener("click", () => this.handleCardClick(this._name, this._link));
    this._buttonDelete.addEventListener("click", () => this._onTrashClick());
    this._buttonLike.addEventListener("click", () => this._onLikeClick());
  }

  _onTrashClick() {
    this._onClickDeleteCard(this);
  }

  _onLikeClick() {
    this._handleLikeCard(this);
  }

  _checkLikes() {
    this._likes.some(element => {
      if (element._id === this._userId) {
        this._buttonLike.classList.add('elements__like_active');
        return true;
      }
    });

    this._likesCounter.textContent = this._likes.length;
  }

  get isLiked() {
    return this._buttonLike.classList.contains('elements__like_active');
  }

  updateLikes(likes) {
    this._buttonLike.classList.toggle('elements__like_active');
    this._likesCounter.textContent = likes.length;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}

export default Card;
