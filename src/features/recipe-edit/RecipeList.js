import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import * as _ from 'lodash';

export class RecipeList extends Component {
  static propTypes = {
    recipeEdit: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.retrieveRecipeList();
  }

  render() {
    return (
      <div className="recipe-edit-recipe-list">
        {this.props.recipeEdit.retrieveRecipePending ? (
          'Loading...'
        ) : _.isNil(this.props.recipeEdit.recipes) ? (
          'No recipe found.'
        ) : (
          <List>
            {this.props.recipeEdit.recipes.map((recipe, index) => (
              <ListItem
                    key={recipe.id}
                    dense={true}
                    button={true}
                    onClick={() => this.props.history.push('/recipe-edit/recipe/' + recipe.id)}
                    >
                <ListItemText primary={(<Link style={{ "fontSize": 16 }} to={'/recipe-edit/recipe/' + recipe.id}>{recipe.name}</Link>)} />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    recipeEdit: state.recipeEdit,
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
)(RecipeList);
