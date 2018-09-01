import React from 'react';
import { shallow } from 'enzyme';
import { Recipe } from '../../../src/features/recipe-edit/Recipe';

describe('recipe-edit/Recipe', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipeEdit: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Recipe {...props} />
    );

    expect(
      renderedComponent.find('.recipe-edit-recipe').length
    ).toBe(1);
  });
});
