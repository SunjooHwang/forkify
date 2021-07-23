import { mark } from 'regenerator-runtime';
import View from './View.js';

class ShoppingListView extends View {
  _parentElement = document.querySelector('.shopping-items');
  _recipeElement = document.querySelector('.recipe');

  addHandlerShoppingList(handler) {
    this._recipeElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--shopping');
      console.log(this);
      if (!btn) return;
      handler();
    });
  }
  _generateMarkupShoppingItem(ingredient) {
    const markup = `
      <li class="shopping-item">
        <span class="item item__desc">${ingredient.description}</span>
        <span class="item item__qty">${ingredient.quantity}</span>
        <span class="item item__unit">${ingredient.unit}</span>
      </li>
      `;
    return markup;
  }

  _generateMarkup() {
    // console.log(
    //   this._data[0].map(ing => this._generateMarkupShoppingItem(ing)).join('')
    // );
    return this._data
      .map(ing => this._generateMarkupShoppingItem(ing))
      .join('');
  }
}

export default new ShoppingListView();
