import React, { Component } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as _ from 'lodash';

export class Ingredient extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="recipe-ingredient">
        <TextField
          label={'Ingredient'}
          className={'ingredient-name'}
          value={!_.isNil(this.props.name) ? this.props.name : ''}
          placeholder={'Ingredient'}
          onChange={this.props.actions.updateIngredient.bind(this, this.props.index, 'name')}
        />
        <TextField
          label={'Quantity'}
          className={'ingredient-quantity'}
          value={!_.isNil(this.props.quantity) ? this.props.quantity : 0}
          placeholder={'Quantity'}
          type="number"
          onChange={this.props.actions.updateIngredient.bind(this, this.props.index, 'quantity')}
        />
        <TextField
          label={'Unit'}
          className={'ingredient-unit'}
          value={!_.isNil(this.props.unit) ? this.props.unit : ''}
          placeholder={'Unit'}
          onChange={this.props.actions.updateIngredient.bind(this, this.props.index, 'unit')}
        />
        <TextField
          label={'Loss'}
          className={'ingredient-loss'}
          value={!_.isNil(this.props.loss) ? this.props.loss : 0}
          placeholder={'Loss'}
          type="number"
          onChange={this.props.actions.updateIngredient.bind(this, this.props.index, 'loss')}
        />
        <TextField
          label={'Value'}
          className={'ingredient-value'}
          value={!_.isNil(this.props.value) ? this.props.value : 0}
          placeholder={'Value'}
          type="number"
          onChange={this.props.actions.updateIngredient.bind(this, this.props.index, 'value')}
        />
        <IconButton>
          <RemoveCircleOutline onClick={this.props.actions.removeIngredient.bind(this.props.index)} />
        </IconButton>
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
)(Ingredient);
