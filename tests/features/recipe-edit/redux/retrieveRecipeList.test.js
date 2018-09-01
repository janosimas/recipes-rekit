import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  RECIPE_EDIT_RETRIEVE_RECIPE_LIST_BEGIN,
  RECIPE_EDIT_RETRIEVE_RECIPE_LIST_SUCCESS,
  RECIPE_EDIT_RETRIEVE_RECIPE_LIST_FAILURE,
  RECIPE_EDIT_RETRIEVE_RECIPE_LIST_DISMISS_ERROR,
} from '../../../../src/features/recipe-edit/redux/constants';

import {
  retrieveRecipeList,
  dismissRetrieveRecipeListError,
  reducer,
} from '../../../../src/features/recipe-edit/redux/retrieveRecipeList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('recipe-edit/redux/retrieveRecipeList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when retrieveRecipeList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(retrieveRecipeList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when retrieveRecipeList fails', () => {
    const store = mockStore({});

    return store.dispatch(retrieveRecipeList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_EDIT_RETRIEVE_RECIPE_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRetrieveRecipeListError', () => {
    const expectedAction = {
      type: RECIPE_EDIT_RETRIEVE_RECIPE_LIST_DISMISS_ERROR,
    };
    expect(dismissRetrieveRecipeListError()).toEqual(expectedAction);
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_LIST_BEGIN correctly', () => {
    const prevState = { retrieveRecipeListPending: false };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipeListPending).toBe(true);
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_LIST_SUCCESS correctly', () => {
    const prevState = { retrieveRecipeListPending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipeListPending).toBe(false);
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_LIST_FAILURE correctly', () => {
    const prevState = { retrieveRecipeListPending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipeListPending).toBe(false);
    expect(state.retrieveRecipeListError).toEqual(expect.anything());
  });

  it('handles action type RECIPE_EDIT_RETRIEVE_RECIPE_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { retrieveRecipeListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RETRIEVE_RECIPE_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.retrieveRecipeListError).toBe(null);
  });
});

