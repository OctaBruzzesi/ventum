import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { connect } from 'react-redux';
import moment from 'moment';
import WaterForm from './WaterForm';
import {
  addSection, addField, fetchDynamicForm, editWater
} from '../../redux/water/waterActions';

class WaterUpdate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      waterData: null,
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.fetchDynamicForm();
    
    const { id, waterData } = this.props.location.state;

    this.setState({
      id: id,
      waterData: waterData,
    });
  }

  addSection(label, key) {
    this.props.addSection(label, key);
  }

  addField(section, label, key) {
    this.props.addField(section, label, key);
  }

  handleEdit(values) {
    const { user } = this.props;
    const { id } = this.state;

    this.props.editWater(id, values, user.user);
  }

  render() {
    const { water } = this.props;
    const { waterData } = this.state;

    return (
      <WaterForm
        onFormSubmit={this.handleEdit}
        addField={(section, label, key) => this.addField(section, label, key)}
        addSection={(label, key) => this.addSection(label, key)}
        initialValues={{
          water: waterData,
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
  editWater: (id, newWater, user) => dispatch(editWater(id, newWater, user)),
});

export default connect(state => ({ water: state.water, user: state.user }), mapDispatchToProps)(WaterUpdate);

WaterUpdate.propTypes = {
  water: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  editWater: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
