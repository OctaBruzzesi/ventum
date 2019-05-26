import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SoilForm from './SoilForm';
import {
  addSection, addField, fetchDynamicForm, editSoil,
} from '../../redux/soil/soilActions';

class SoilUpdate extends PureComponent {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
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

  handleEdit(values) {
    const { user, location } = this.props;

    this.props.editSoil(location.state.id, values, user.user);
  }

  render() {
    const { soil, location } = this.props;

    return (
      location.state.soil ? (
        <SoilForm
          onFormSubmit={this.handleEdit}
          addField={(section, label, key) => this.addField(section, label, key)}
          addSection={(label, key) => this.addSection(label, key)}
          initialValues={{
            ...location.state.soil,
          }}
          dynamicForm={soil.form}
        />
      )
        : null
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
  addSection: (label, key) => dispatch(addSection(label, key)),
  addField: (section, label, key) => dispatch(addField(section, label, key)),
  editSoil: (id, newSoil, user) => dispatch(editSoil(id, newSoil, user)),
});

export default connect(state => ({ soil: state.soil, user: state.user }), mapDispatchToProps)(SoilUpdate);

SoilUpdate.propTypes = {
  soil: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  editSoil: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
