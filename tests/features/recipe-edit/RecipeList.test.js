import React from 'react';
import { shallow } from 'enzyme';
import { RecipeList } from '../../../src/features/recipe-edit/RecipeList';

describe('recipe-edit/RecipeList', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipeEdit: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RecipeList {...props} />
    );

    expect(
      renderedComponent.find('.recipe-edit-recipe-list').length
    ).toBe(1);
  });
});
