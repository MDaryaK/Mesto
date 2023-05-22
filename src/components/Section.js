class Section {

  constructor({ elements, render }, container) {
    this._elements = elements;
    this._renderer = render;
    this._container = container;
  }

  renderElements() {
    this._elements.forEach((item) => this._renderer(item));
    
  }

  addItem(item) {
    this._container.prepend(item);
  }
}

export default Section;
