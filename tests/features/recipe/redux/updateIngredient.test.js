import {
  RECIPE_UPDATE_INGREDIENT,
} from '../../../../src/features/recipe/redux/constants';

import {
  updateIngredient,
  reducer,
} from '../../../../src/features/recipe/redux/updateIngredient';

describe('recipe/redux/updateIngredient', () => {
  it('returns correct action by updateIngredient', () => {
    expect(updateIngredient()).toHaveProperty('type', RECIPE_UPDATE_INGREDIENT);
  });

  it('handles action type RECIPE_UPDATE_INGREDIENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: RECIPE_UPDATE_INGREDIENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
