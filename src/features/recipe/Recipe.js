import React, { Component } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { AddCircleOutline, Save } from '@material-ui/icons';
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

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actions.retrieveRecipe({ id: this.props.match.params.id });
    }
  }

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
            <IconButton
              className="save-recipe"
              onClick={this.props.actions.saveRecipe.bind(this, this.props.recipe.recipe)}
            >
              <Save />
            </IconButton>
            <h2>{this.props.recipe.recipe.name}</h2>
            <div>{this.props.recipe.recipe.description}</div>
            <div>
              <IconButton onClick={this.props.actions.addIngredient} className="add-ingredient">
                <AddCircleOutline />
              </IconButton>
              {this.props.recipe.recipe.ingredients.map((ingredient, index) => (
                <Ingredient
                  name={ingredient.name}
                  key={index}
                  index={index}
                  quantity={ingredient.quantity}
                  unit={ingredient.unit}
                  loss={ingredient.loss}
                  value={ingredient.value}
                />
              ))}
            </div>
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
