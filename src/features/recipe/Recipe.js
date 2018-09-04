import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as _ from 'lodash';

import Ingredient from './Ingredient';

export class Recipe extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.retrieveRecipe({ id: this.props.match.params.id });
  }

  render() {
    return (
      <Paper className="recipe-recipe">
        {this.props.recipe.retrieveRecipePending ? (
          'Loading...'
        ) : _.isNil(this.props.recipe.recipe) || !_.isNil(this.props.recipe.retrieveRecipeError) ? (
          'Recipe not found.'
        ) : (
          <React.Fragment>
            <h2>{this.props.recipe.recipe.name}</h2>
            <div>{this.props.recipe.recipe.description}</div>
            {this.props.recipe.recipe.ingredients.map((ingredient, index) => (
              <Ingredient
                name={ingredient.name}
                key={index}
                quantity={ingredient.quantity}
                unit={ingredient.unit}
              />
            ))}
          </React.Fragment>
        )}
      </Paper>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recipe);
