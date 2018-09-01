import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  RECIPE_EDIT_RETRIEVE_RECIPE_BEGIN,
  RECIPE_EDIT_RETRIEVE_RECIPE_SUCCESS,
  RECIPE_EDIT_RETRIEVE_RECIPE_FAILURE,
  RECIPE_EDIT_RETRIEVE_RECIPE_DISMISS_ERROR,
} from '../../../../src/features/recipe-edit/redux/constants';

import {
  retrieveRecipe,
  dismissRetrieveRecipeError,
  reducer,
} from '../../../../src/features/recipe-edit/redux/retrieveRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('recipe-edit/redux/retrieveRecipe', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when retrieveRecipe succeeds', () => {
    const store = mockStore({});

    return store.dispatch(retrieveRecipe())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_SUCCESS);
      });
  });

  it('dispatches failure action when retrieveRecipe fails', () => {
    const store = mockStore({});

    return store.dispatch(retrieveRecipe({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRetrieveRecipeError', () => {
    const expectedAction = {
      type: RECIPE_EDIT_RETRIEVE_RECIPE_DISMISS_ERROR,
    };
    expect(dismissRetrieveRecipeError()).toEqual(expectedAction);
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_BEGIN correctly', () => {
    const prevState = { retrieveRecipePending: false };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipePending).toBe(true);
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_SUCCESS correctly', () => {
    const prevState = { retrieveRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipePending).toBe(false);
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_FAILURE correctly', () => {
    const prevState = { retrieveRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipePending).toBe(false);
    expect(state.retrieveRecipeError).toEqual(expect.anything());
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_DISMISS_ERROR correctly', () => {
    const prevState = { retrieveRecipeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipeError).toBe(null);
  });
});

