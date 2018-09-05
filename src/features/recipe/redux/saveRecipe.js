import {
  RECIPE_SAVE_RECIPE_BEGIN,
  RECIPE_SAVE_RECIPE_SUCCESS,
  RECIPE_SAVE_RECIPE_FAILURE,
  RECIPE_SAVE_RECIPE_DISMISS_ERROR,
} from './constants';

import * as _ from 'lodash';

const updateRecipe = recipe => {
  let updateRecipePromise;
  if (!_.isNil(recipe.id)) {
    updateRecipePromise = fetch('http://localhost:3000/api/recipes', {
      body: JSON.stringify({
        ...recipe,
        ingredients: undefined,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'put',
    });
  } else {
    updateRecipePromise = fetch('http://localhost:3000/api/recipes', {
      body: JSON.stringify({
        ...recipe,
        ingredients: undefined,
        id: undefined,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
    });
  }

  return updateRecipePromise;
};

const updateIngredient = (recipe, ingredient) => {
  let updateRecipePromise;
  if (!_.isNil(ingredient.id)) {
    updateRecipePromise = fetch('http://localhost:3000/api/recipes/' + recipe.id + '/ingredients/'+ingredient.id, {
      body: JSON.stringify({
        ...ingredient,
        recipeId: undefined,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'put',
    });
  } else {
    updateRecipePromise = fetch('http://localhost:3000/api/recipes/' + recipe.id + '/ingredients', {
      body: JSON.stringify({
        ...ingredient,
        id: undefined,
        recipeId: undefined,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
    });
  }

  return updateRecipePromise;
};

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function saveRecipe(recipe = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: RECIPE_SAVE_RECIPE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise(async (resolve, reject) => {
      updateRecipe(recipe)
        .then(res => res.json())
        .then(
          res => {
            Promise.all(
              recipe.ingredients.map(ingredient => updateIngredient(recipe, ingredient)),
            ).then(() => {
              dispatch({
                type: RECIPE_SAVE_RECIPE_SUCCESS,
                data: res,
              });
              resolve(res);
            });
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          err => {
            dispatch({
              type: RECIPE_SAVE_RECIPE_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSaveRecipeError() {
  return {
    type: RECIPE_SAVE_RECIPE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECIPE_SAVE_RECIPE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        saveRecipePending: true,
        saveRecipeError: null,
      };

    case RECIPE_SAVE_RECIPE_SUCCESS:
      // The request is success
      return {
        ...state,
        saveRecipePending: false,
        saveRecipeError: null,
      };

    case RECIPE_SAVE_RECIPE_FAILURE:
      // The request is failed
      return {
        ...state,
        saveRecipePending: false,
        saveRecipeError: action.data.error,
      };

    case RECIPE_SAVE_RECIPE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        saveRecipeError: null,
      };

    default:
      return state;
  }
}
