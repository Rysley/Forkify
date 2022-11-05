import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './View.js';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();

/* _generateMarkup() {
  const markup = this._data.map(this._generateResult).join('');
  return markup;
}

_generateResult(res) {
  const id = window.location.hash.slice(1);

  return `<li class="preview">
  <a class="preview__link ${
    res.id === id ? 'preview__link--active' : ''
  }" href="#${res.id}">
    <figure class="preview__fig">
      <img src="${res.image}" alt="Test" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${res.title}</h4>
      <p class="preview__publisher">${res.publisher}</p>
    </div>
  </a>
</li>`;
} */
