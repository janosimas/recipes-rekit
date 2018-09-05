import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  RECIPE_SAVE_RECIPE_BEGIN,
  RECIPE_SAVE_RECIPE_SUCCESS,
  RECIPE_SAVE_RECIPE_FAILURE,
  RECIPE_SAVE_RECIPE_DISMISS_ERROR,
} from '../../../../src/features/recipe/redux/constants';

import {
  saveRecipe,
  dismissSaveRecipeError,
  reducer,
} from '../../../../src/features/recipe/redux/saveRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('recipe/redux/saveRecipe', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveRecipe succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveRecipe())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_SAVE_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_SAVE_RECIPE_SUCCESS);
      });
  });

  it('dispatches failure action when saveRecipe fails', () => {
    const store = mockStore({});

    return store.dispatch(saveRecipe({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_SAVE_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_SAVE_RECIPE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveRecipeError', () => {
    const expectedAction = {
      type: RECIPE_SAVE_RECIPE_DISMISS_ERROR,
    };
    expect(dismissSaveRecipeError()).toEqual(expectedAction);
  });

  it('handles action type RECIPE_SAVE_RECIPE_BEGIN correctly', () => {
    const prevState = { saveRecipePending: false };
    const state = reducer(
      prevState,
      { type: RECIPE_SAVE_RECIPE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRecipePending).toBe(true);
  });

  it('handles action type RECIPE_SAVE_RECIPE_SUCCESS correctly', () => {
    const prevState = { saveRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_SAVE_RECIPE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRecipePending).toBe(false);
  });

  it('handles action type RECIPE_SAVE_RECIPE_FAILURE correctly', () => {
    const prevState = { saveRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_SAVE_RECIPE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRecipePending).toBe(false);
    expect(state.saveRecipeError).toEqual(expect.anything());
  });

  it('handles action type RECIPE_SAVE_RECIPE_DISMISS_ERROR correctly', () => {
    const prevState = { saveRecipeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: RECIPE_SAVE_RECIPE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRecipeError).toBe(null);
  });
});

