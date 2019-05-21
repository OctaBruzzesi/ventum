import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EnvironmentForm from './EnvironmentForm';
import {
  addSection, addField, fetchDynamicForm, editEnvironment,
} from '../../redux/environment/environmentActions';

class EnvironmentUpdate extends PureComponent {
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

    this.props.editEnvironment(location.state.id, values, user.user);
  }

  render() {
    const { environment, location } = this.props;

    return (
      location.state.environment ? (
        <EnvironmentForm
          onFormSubmit={this.handleEdit}
          addField={(section, label, key) => this.addField(section, label, key)}
          addSection={(label, key) => this.addSection(label, key)}
          initialValues={{
            ...location.state.environment,
          }}
          dynamicForm={environment.form}
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
  editEnvironment: (id, newEnvironment, user) => dispatch(editEnvironment(id, newEnvironment, user)),
});

export default connect(state => ({ environment: state.environment, user: state.user }), mapDispatchToProps)(EnvironmentUpdate);

EnvironmentUpdate.propTypes = {
  environment: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  editEnvironment: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
