import {
  RECIPE_RETRIEVE_RECIPE_LIST_BEGIN,
  RECIPE_RETRIEVE_RECIPE_LIST_SUCCESS,
  RECIPE_RETRIEVE_RECIPE_LIST_FAILURE,
  RECIPE_RETRIEVE_RECIPE_LIST_DISMISS_ERROR,
} from './constants';

import * as _ from 'lodash';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function retrieveRecipeList(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: RECIPE_RETRIEVE_RECIPE_LIST_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/recipes')
        .then(res => res.json())
        .then(
          res => {
            if (!_.isNil(res.error)) {
              dispatch({
                type: RECIPE_RETRIEVE_RECIPE_LIST_FAILURE,
                data: { error: res.error },
              });
              reject(res.error);
              return;
            }

            dispatch({
              type: RECIPE_RETRIEVE_RECIPE_LIST_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          err => {
            dispatch({
              type: RECIPE_RETRIEVE_RECIPE_LIST_FAILURE,
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
export function dismissRetrieveRecipeListError() {
  return {
    type: RECIPE_RETRIEVE_RECIPE_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECIPE_RETRIEVE_RECIPE_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        retrieveRecipeListPending: true,
        retrieveRecipeListError: null,
      };

    case RECIPE_RETRIEVE_RECIPE_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        recipes: action.data,
        retrieveRecipeListPending: false,
        retrieveRecipeListError: null,
      };

    case RECIPE_RETRIEVE_RECIPE_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        retrieveRecipeListPending: false,
        retrieveRecipeListError: action.data.error,
      };

    case RECIPE_RETRIEVE_RECIPE_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        retrieveRecipeListError: null,
      };

    default:
      return state;
  }
}
