import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClimateForm from './ClimateForm';
import {
  addSection, addField, fetchDynamicForm, editClimate,
} from '../../redux/climate/climateActions';

class ClimateUpdate extends PureComponent {
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

    this.props.editClimate(location.state.id, values, user.user);
  }

  render() {
    const { climate, location } = this.props;

    return (
      location.state.climate ? (
        <ClimateForm
          onFormSubmit={this.handleEdit}
          addField={(section, label, key) => this.addField(section, label, key)}
          addSection={(label, key) => this.addSection(label, key)}
          initialValues={{
            ...location.state.climate,
          }}
          dynamicForm={climate.form}
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
  editClimate: (id, newClimate, user) => dispatch(editClimate(id, newClimate, user)),
});

export default connect(state => ({ climate: state.climate, user: state.user }), mapDispatchToProps)(ClimateUpdate);

ClimateUpdate.propTypes = {
  climate: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  editClimate: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
