import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
// import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Ingredient extends Component {
  static propTypes = {
    recipeEdit: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="recipe-edit-ingredient" id={this.props.name.key}>
        <TextField
          label={'Ingredient'}
          className={'ingredient-name'}
          value={this.props.name ? this.props.name : ''}
          placeholder={'Ingredient'}
        />
        <TextField
          label={'Quantity'}
          className={'ingredient-quantity'}
          value={this.props.quantity ? this.props.quantity : 0}
          placeholder={'Quantity'}
        />
        <TextField
          label={'Unit'}
          className={'ingredient-unit'}
          value={this.props.unit ? this.props.unit : ''}
          placeholder={'Unit'}
        />
      </div>
    );
  }
}


        // <IconButton>
        //   <RemoveCircleOutline />
        // </IconButton>

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
)(Ingredient);
