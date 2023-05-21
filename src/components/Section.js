class Section {

  constructor({ elements, render }, box) {
    this._elements = elements;
    this._render = render;
    this._box = box;
  }

  renderElements() {
    this._elements.forEach((item) => {
      const card = this._render(item);
      this._box.append(card);
    });
  }

  addItem(item) {
    this._box.prepend(item);
  }
}

export default Section;
