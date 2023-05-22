import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._imagePopupPhoto = this._popup.querySelector('.popup__photo');
    this._imagePopupCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();

    this._imagePopupPhoto.src = link;
    this._imagePopupPhoto.alt = name;
    this._imagePopupCaption.textContent = name;
  }
}

export default PopupWithImage;

