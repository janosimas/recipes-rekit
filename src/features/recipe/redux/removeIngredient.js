// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { RECIPE_REMOVE_INGREDIENT } from './constants';

export function removeIngredient(args = {}) {
  return {
    type: RECIPE_REMOVE_INGREDIENT,
    index: args,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECIPE_REMOVE_INGREDIENT:
      const recipe = state.recipe;
      recipe.ingredients.splice(action.index, 1);
      return {
        ...state,
        recipe,
      };

    default:
      return state;
  }
}
