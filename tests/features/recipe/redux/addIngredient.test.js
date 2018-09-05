import {
  RECIPE_ADD_INGREDIENT,
} from '../../../../src/features/recipe/redux/constants';

import {
  addIngredient,
  reducer,
} from '../../../../src/features/recipe/redux/addIngredient';

describe('recipe/redux/addIngredient', () => {
  it('returns correct action by addIngredient', () => {
    expect(addIngredient()).toHaveProperty('type', RECIPE_ADD_INGREDIENT);
  });

  it('handles action type RECIPE_ADD_INGREDIENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RECIPE_ADD_INGREDIENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
