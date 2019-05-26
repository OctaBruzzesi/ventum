import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ClimateForm from './ClimateForm';
import {
  addClimate, addSection, addField, fetchDynamicForm,
} from '../../redux/climate/climateActions';

class ClimateNew extends PureComponent {
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
    this.props.addClimate(values, user.user);
  }

  render() {
    const { climate } = this.props;
    return (
      <ClimateForm
        onFormSubmit={this.handleCreate}
        addField={(section, label, key) => this.addField(section, label, key)}
        addSection={(label, key) => this.addSection(label, key)}
        initialValues={{
          date: moment().format('YYYY-MM-DDTHH:mm'),
        }}
        dynamicForm={climate.form}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
  addSection: (label, key) => dispatch(addSection(label, key)),
  addField: (section, label, key) => dispatch(addField(section, label, key)),
  addClimate: (newClimate, user) => dispatch(addClimate(newClimate, user)),
});

export default connect(state => ({ climate: state.climate, user: state.user }), mapDispatchToProps)(ClimateNew);

ClimateNew.propTypes = {
  climate: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  addClimate: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
