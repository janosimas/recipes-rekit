import React from 'react';
import { shallow } from 'enzyme';
import { Ingredient } from '../../../src/features/recipe-edit/Ingredient';

describe('recipe-edit/Ingredient', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipeEdit: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Ingredient {...props} />
    );

    expect(
      renderedComponent.find('.recipe-edit-ingredient').length
    ).toBe(1);
  });
});
