import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import WaterForm from './WaterForm';
import {
  addWater, addSection, addField, fetchDynamicForm,
} from '../../redux/water/waterActions';

class WaterNew extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.props.fetchDynamicForm();
  }

  addSection(label, key) {
    this.props.addSection(label, key);
  }

  addField(section, label, key) {
    this.props.addField(section, label, key);
  }

  handleCreate(values) {
    this.props.addWater(values);
  }

  render() {
    const { water } = this.props;
    return (
      <WaterForm
        onFormSubmit={this.handleCreate}
        addField={(section, label, key) => this.addField(section, label, key)}
        addSection={(label, key) => this.addSection(label, key)}
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
  addSection: (label, key) => dispatch(addSection(label, key)),
  addField: (section, label, key) => dispatch(addField(section, label, key)),
  addWater: newWater => dispatch(addWater(newWater)),
});

export default connect(state => ({ water: state.water }), mapDispatchToProps)(WaterNew);

WaterNew.propTypes = {
  water: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  addWater: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
