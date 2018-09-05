// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { RECIPE_UPDATE_INGREDIENT } from './constants';

export function updateIngredient(index, element, event) {
  return {
    type: RECIPE_UPDATE_INGREDIENT,
    index,
    element,
    event,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECIPE_UPDATE_INGREDIENT:
      const recipe = state.recipe;
      recipe.ingredients[action.index][action.element] = action.event.currentTarget.value;
      return {
        ...state,
        recipe,
      };

    default:
      return state;
  }
}
