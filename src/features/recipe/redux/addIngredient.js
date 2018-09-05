// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { RECIPE_ADD_INGREDIENT } from './constants';

export function addIngredient() {
  return {
    type: RECIPE_ADD_INGREDIENT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RECIPE_ADD_INGREDIENT:
      const recipe = state.recipe;
      recipe.ingredients.push({
        name: 'string',
        quantity: 0,
        unit: 'string',
        loss: 0,
        value: 0,
      });
      return {
        ...state,
        recipe,
      };

    default:
      return state;
  }
}
