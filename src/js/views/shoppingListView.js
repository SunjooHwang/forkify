import { mark } from 'regenerator-runtime';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ShoppingListView extends View {
  _parentElement = document.querySelector('.shopping-list');
  _recipeElement = document.querySelector('.recipe');
  _errorMessage = 'Your shopping list is currently empty!';

  addHandlerAddToShoppingList(handler) {
    this._recipeElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--shopping');
      if (!btn) return;
      handler();
    });
  }

  addHandlerEmptyShoppingList(handler) {
    const btn = document.querySelector('.btn--empty');
    btn.addEventListener('click', handler);
  }

  _generateMarkupShoppingItem(ingredient) {
    const markup = `
      <li class="shopping-list__item">
        <svg class="shopping-list__item__icon">
          <use href="${icons}#icon-check"></use>
          &nbsp;  
        </svg>
        <span class="item-info item__qty">${
          ingredient.quantity ? ingredient.quantity : ''
        }</span>
        <span class="item-info item__unit">&nbsp;${ingredient.unit}</span>
        <span class="item-info item__desc">&nbsp;${
          ingredient.description
        }</span>
      </li>
      `;
    return markup;
  }

  _generateMarkup() {
    return this._data
      .map(ing => this._generateMarkupShoppingItem(ing))
      .join('');
  }
}

export default new ShoppingListView();
