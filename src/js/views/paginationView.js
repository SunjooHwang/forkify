import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { mark } from 'regenerator-runtime';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currentPage;
  _numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currentPage = this._data.page;
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //   Page 1, and there are other pages
    if (this._currentPage === 1 && this._numPages > 1)
      return `${this._generateMarkupButton(
        'next'
      )}${this._generateMarkupNumPages()}`;

    //   Last page
    if (this._currentPage === this._numPages && this._numPages > 1)
      return `${this._generateMarkupButton(
        'prev'
      )}${this._generateMarkupNumPages()}`;

    //   Other page
    if (this._currentPage < this._numPages)
      return `${this._generateMarkupButton('prev')}${this._generateMarkupButton(
        'next'
      )}${this._generateMarkupNumPages()}`;

    //   Page 1, and there NO other pages
    return '';
  }

  _generateMarkupButton(nav) {
    const prevBtn = `
    <button data-goto="${
      this._currentPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._currentPage - 1}</span>
    </button>
    `;
    const nextBtn = `
    <button data-goto="${
      this._currentPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${this._currentPage + 1}</span>
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button> 
    `;

    if (nav === 'next') return nextBtn;
    if (nav === 'prev') return prevBtn;
  }

  _generateMarkupNumPages() {
    const markup = `  
    <span class="pagination__num total--pages"> ${this._numPages} total pages </span>
    `;
    // const lastBtn = `
    //   <button data-goto="${this._numPages}" class="btn--inline pagination__btn--last">
    //   <span>Last Page</span>
    //   </button>
    // `;
    return markup;
  }
}

export default new PaginationView();
