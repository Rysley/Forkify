import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

/* import 'core-js/stable';
import 'regenerator-runtime/runtime'; */
/* import { async } from 'regenerator-runtime'; */
import { MODAL_CLOSE_SEC } from './config.js';

//PARCEL FEATURE
/* if (module.hot) {
  module.hot.accept;
} */

if (module.hot) {
  module.hot.dispose;
}
console.log('hello');

const controlRecipes = async function () {
  const recipeId = window.location.hash.slice(1);

  if (!recipeId) return;

  try {
    //0// Waiting for the load
    recipeView.renderSpinner();
    //1// Loading Recipe
    bookmarksView.update(model.state.bookmarks);
    //update the results view
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(recipeId);
    // const { recipe } = model.state;
    //2// Rendering Recipe
    recipeView.render(model.state.recipe);
    //controlServings();
    console.log(model.state.recipe);
    //renderRecipe(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlSearchResults = async function () {
  try {
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    // load search results
    await model.loadSearchResults(query);
    //render results
    resultsView.render(model.getSearchResultsPage(1));
    //render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  //uppdate the recipe view (or actually RECIPE MARKUP)
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //console.log(model.state.recipe);
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //loading spinner
    addRecipeView.renderSpinner();
    //async upload recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //render recipe
    recipeView.render(model.state.recipe);
    //success message
    addRecipeView.renderMessage();
    //close form window

    //render bookmarks
    bookmarksView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //timeout display
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();

//^^^ this is great for multiple events for   the same element */
//window.addEventListener('hashchange', showRecipe);
//window.addEventListener('load', showRecipe);
