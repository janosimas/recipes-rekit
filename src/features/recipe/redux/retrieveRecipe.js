import {
  RECIPE_RETRIEVE_RECIPE_BEGIN,
  RECIPE_RETRIEVE_RECIPE_SUCCESS,
  RECIPE_RETRIEVE_RECIPE_FAILURE,
  RECIPE_RETRIEVE_RECIPE_DISMISS_ERROR,
} from './constants';

import * as _ from 'lodash';

const getRecipeById = async id => {
  return fetch('http://localhost:3000/api/recipes/' + id+'?filter[include]=ingredients').then(res => res.json());
};

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function retrieveRecipe(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: RECIPE_RETRIEVE_RECIPE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      getRecipeById(args.id)
        .then(
          async (recipe) => {
            if (!_.isNil(recipe.error)) {
              dispatch({
                type: RECIPE_RETRIEVE_RECIPE_FAILURE,
                data: { error: recipe.error },
              });
              reject(recipe.error);
              return;
            }

            dispatch({
              type: RECIPE_RETRIEVE_RECIPE_SUCCESS,
              data: recipe,
            });
            resolve(recipe);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          err => {
            dispatch({
              type: RECIPE_RETRIEVE_RECIPE_FAILURE,
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
export function dismissRetrieveRecipeError() {
  return {
    type: RECIPE_RETRIEVE_RECIPE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECIPE_RETRIEVE_RECIPE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        retrieveRecipePending: true,
        retrieveRecipeError: null,
      };

    case RECIPE_RETRIEVE_RECIPE_SUCCESS:
      // The request is success
      return {
        ...state,
        recipe: action.data,
        retrieveRecipePending: false,
        retrieveRecipeError: null,
      };

    case RECIPE_RETRIEVE_RECIPE_FAILURE:
      // The request is failed
      return {
        ...state,
        retrieveRecipePending: false,
        retrieveRecipeError: action.data.error,
      };

    case RECIPE_RETRIEVE_RECIPE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        retrieveRecipeError: null,
      };

    default:
      return state;
  }
}
