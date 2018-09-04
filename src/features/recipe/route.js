// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Recipe,
  RecipeList,
  Layout
} from './';

export default {
  path: 'recipe',
  name: 'Recipe',
  component: Layout,
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'recipe/:id', name: 'Recipe', component: Recipe },
    { path: 'list', name: 'Recipe list', component: RecipeList },
  ],
};
