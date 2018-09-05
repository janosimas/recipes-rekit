import {
  RECIPE_REMOVE_INGREDIENT,
} from '../../../../src/features/recipe/redux/constants';

import {
  removeIngredient,
  reducer,
} from '../../../../src/features/recipe/redux/removeIngredient';

describe('recipe/redux/removeIngredient', () => {
  it('returns correct action by removeIngredient', () => {
    expect(removeIngredient()).toHaveProperty('type', RECIPE_REMOVE_INGREDIENT);
  });

  it('handles action type RECIPE_REMOVE_INGREDIENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RECIPE_REMOVE_INGREDIENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
