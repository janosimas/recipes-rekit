import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RecipeList } from './';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="recipe-layout">
        <RecipeList />
        <div className="recipe-page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
