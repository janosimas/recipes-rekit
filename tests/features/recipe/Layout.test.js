import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Layout />);
  expect(renderedComponent.find('.recipe-layout').length).toBe(1);
});
