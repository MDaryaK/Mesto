class Card {
  constructor({ template, name, link }, handleCardClick ) {
    this._name = name;
    this._link = link;

    this._card = template.content.querySelector('.elements__item').cloneNode(true);
    this._like = this._card.querySelector('.elements__like');
    this._trash = this._card.querySelector('.elements__trash');
    this._title = this._card.querySelector('.elements__title');
    this._photo = this._card.querySelector('.elements__photo');

    this.handleCardClick = handleCardClick;
  }

  create() {
    this._photo.src = this._link;
    this._photo.alt = this._name;

    this._title.textContent = this._name;

    this._addEventListeners();

    return this._card;
  }

  _addEventListeners() {
    this._photo.addEventListener("click", () => this.handleCardClick());
    this._trash.addEventListener("click", () => this._onTrashClick());
    this._like.addEventListener("click", () => this._onLikeClick());
  }

  _onTrashClick() {
    this._card.remove();
  }

  _onLikeClick() {
    this._like.classList.toggle("elements__like_active")
  }
}

export default Card;
