import React from 'react';
import { shallow } from 'enzyme';
import { RecipeList } from '../../../src/features/recipe/RecipeList';

describe('recipe/RecipeList', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipeEdit: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RecipeList {...props} />
    );

    expect(
      renderedComponent.find('.recipe-recipe-list').length
    ).toBe(1);
  });
});
