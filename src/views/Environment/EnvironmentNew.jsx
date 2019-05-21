import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import EnvironmentForm from './EnvironmentForm';
import {
  addEnvironment, addSection, addField, fetchDynamicForm,
} from '../../redux/environment/environmentActions';

class EnvironmentNew extends PureComponent {
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
    this.props.addEnvironment(values, user.user);
  }

  render() {
    const { environment } = this.props;
    return (
      <EnvironmentForm
        onFormSubmit={this.handleCreate}
        addField={(section, label, key) => this.addField(section, label, key)}
        addSection={(label, key) => this.addSection(label, key)}
        initialValues={{
          date: moment().format('YYYY-MM-DDTHH:mm'),
        }}
        dynamicForm={environment.form}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
  addSection: (label, key) => dispatch(addSection(label, key)),
  addField: (section, label, key) => dispatch(addField(section, label, key)),
  addEnvironment: (newEnvironment, user) => dispatch(addEnvironment(newEnvironment, user)),
});

export default connect(state => ({ environment: state.environment, user: state.user }), mapDispatchToProps)(EnvironmentNew);

EnvironmentNew.propTypes = {
  environment: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  addEnvironment: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
