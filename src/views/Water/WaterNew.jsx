import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import WaterForm from './WaterForm';
import { addWater, fetchDynamicForm } from '../../redux/water/waterActions';

class WaterNew extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.props.fetchDynamicForm();
  }

  handleCreate(values) {
    this.props.addWater(values);
  }

  render() {
    const { water } = this.props;
    return (
      <WaterForm
        onFormSubmit={this.handleCreate}
        initialValues={{
          date: moment().format('YYYY-MM-DDTHH:mm'),
        }}
        dynamicForm={water.form}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
  addWater: newWater => dispatch(addWater(newWater)),
});

export default connect(state => ({ water: state.water }), mapDispatchToProps)(WaterNew);

WaterNew.propTypes = {
  water: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  addWater: PropTypes.func.isRequired,
};
