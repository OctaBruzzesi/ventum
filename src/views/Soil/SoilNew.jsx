import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import SoilForm from './SoilForm';
import {
  addSoil, addSection, addField, fetchDynamicForm,
} from '../../redux/soil/soilActions';

class SoilNew extends PureComponent {
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
    const { user } = this.props;
    this.props.addSoil(values, user.user);
  }

  render() {
    const { soil } = this.props;
    return (
      <SoilForm
        onFormSubmit={this.handleCreate}
        addField={(section, label, key) => this.addField(section, label, key)}
        addSection={(label, key) => this.addSection(label, key)}
        initialValues={{
          date: moment().format('YYYY-MM-DDTHH:mm'),
        }}
        dynamicForm={soil.form}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
  addSection: (label, key) => dispatch(addSection(label, key)),
  addField: (section, label, key) => dispatch(addField(section, label, key)),
  addSoil: (newSoil, user) => dispatch(addSoil(newSoil, user)),
});

export default connect(state => ({ soil: state.soil, user: state.user }), mapDispatchToProps)(SoilNew);

SoilNew.propTypes = {
  soil: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  addSoil: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
