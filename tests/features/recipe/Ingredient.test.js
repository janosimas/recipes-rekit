import React from 'react';
import { shallow } from 'enzyme';
import { Ingredient } from '../../../src/features/recipe/Ingredient';

describe('recipe/Ingredient', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipeEdit: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Ingredient {...props} />
    );

    expect(
      renderedComponent.find('.recipe-ingredient').length
    ).toBe(1);
  });
});
