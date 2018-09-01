// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Recipe,
  RecipeList,
} from './';

export default {
  path: 'recipe-edit',
  name: 'Recipe edit',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'recipe/:id', name: 'Recipe', component: Recipe },
    { path: 'list', name: 'Recipe list', component: RecipeList },
  ],
};
