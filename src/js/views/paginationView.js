import icons from 'url:../../img/icons.svg';
import View from './View';

class paginagtionView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(direction) {
    let classValue;
    let i;

    if (direction === 'left') {
      classValue = 'prev';
      i = -1;
    }
    if (direction === 'right') {
      classValue = 'next';
      i = +1;
    }

    return `
    <button data-goto="${
      this._data.page + i
    }" class="btn--inline pagination__btn--${classValue}">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-${direction}"></use>
        </svg>
        <span>Page ${this._data.page + i}</span>
    </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('right');
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('left');
    }

    if (curPage < numPages && curPage !== 1) {
      return (
        this._generateMarkupButton('left') + this._generateMarkupButton('right')
      );
    }

    if (numPages === 1) {
      return '';
    }
  }
}

export default new paginagtionView();
