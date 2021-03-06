import React, { Component } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import * as _ from 'lodash';

export class RecipeList extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.retrieveRecipeList();
  }

  render() {
    return (
      <div className="recipe-recipe-list">
        {this.props.recipe.retrieveRecipePending ? (
          'Loading...'
        ) : _.isNil(this.props.recipe.recipes) ||
        _.isEmpty(this.props.recipe.recipes) ||
        !_.isNil(this.props.recipe.retrieveRecipeListError) ? (
          'No recipes found.'
        ) : (
          <React.Fragment>
            <Link style={{ fontSize: 16 }} to={'/recipe/recipe/new'}>
              <IconButton>
                <AddCircleOutline />
              </IconButton>
            </Link>
            <List>
              {this.props.recipe.recipes.map((recipe, index) => (
                <ListItem
                  key={recipe.id}
                  dense={true}
                  button={true}
                  component={Link}
                  to={'/recipe/recipe/' + recipe.id}
                >
                  <ListItemText
                    primary={
                      <Link style={{ fontSize: 16 }} to={'/recipe/recipe/' + recipe.id}>
                        {recipe.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </React.Fragment>
        )}
      </div>
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
)(RecipeList);
