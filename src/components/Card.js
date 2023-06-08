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
    this._like = this._card.querySelector('.elements__like');
    this._trash = this._card.querySelector('.elements__trash');
    this._title = this._card.querySelector('.elements__title');
    this._photo = this._card.querySelector('.elements__photo');
    this._counter = this._card.querySelector('.elements__counter');

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
    this._removeVisibilityTrash();

    return this._card;
  }

  _removeVisibilityTrash() {
    if (this._userId !== this._ownerId) {
      this._trash.remove();
    }
  }

  _addEventListeners() {
    this._photo.addEventListener("click", () => this.handleCardClick());
    this._trash.addEventListener("click", () => this._onTrashClick());
    this._like.addEventListener("click", () => this._onLikeClick());
  }

  _onTrashClick() {
    this._onClickDeleteCard({ card: this, cardId: this._cardId });
  }

  _onLikeClick() {
    this._handleLikeCard(this, this._like, this._cardId);
  }

  _checkLikes() {
    this._likes.forEach(element => {
      if (element._id === this._userId) {
        this._like.classList.add('elements__like_active');
      }
    });

    this._counter.textContent = this._likes.length;
  }

  isLike(likes) {
    this._like.classList.toggle('elements__like_active');
    this._counter.textContent = likes.length;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}

export default Card;
