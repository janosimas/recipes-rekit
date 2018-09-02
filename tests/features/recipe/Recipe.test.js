import React from 'react';
import { shallow } from 'enzyme';
import { Recipe } from '../../../src/features/recipe/Recipe';

describe('recipe/Recipe', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipeEdit: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Recipe {...props} />
    );

    expect(
      renderedComponent.find('.recipe-recipe').length
    ).toBe(1);
  });
});
