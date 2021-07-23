import { mark } from 'regenerator-runtime';
import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe is successfully uploaded';

  _ingredientElement = document.querySelector('.ingredient');
  _btnAddIngredient = document.querySelector('.add-ingredient__btn');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnSubmit = document.querySelector('.upload__btn');

  _ingNum = 4;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
      console.log(data);
    });
  }

  addHandlerAddIngredient(handler) {
    this._btnAddIngredient.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _generateMarkup(ingNum) {
    ingNum = this._ingNum;
    const markup = `
      <label>Ingredient ${ingNum}</label>
      <input
        value="0.5,kg,Rice"
        type="text"
        required
        name="ingredient-${ingNum}"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
    `;
    this._ingNum++;
    return markup;
  }

  addInputField(data) {
    this._data = data;
    console.log(this);
    const markup = this._generateMarkup();
    this._ingredientElement.insertAdjacentHTML('beforeend', markup);
  }
}

export default new AddRecipeView();
