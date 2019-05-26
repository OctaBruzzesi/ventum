import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import BiodiversityForm from './BiodiversityForm';
import {
  addBiodiversity, addSection, addField, fetchDynamicForm,
} from '../../redux/biodiversity/biodiversityActions';

class BiodiversityNew extends PureComponent {
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
    this.props.addBiodiversity(values, user.user);
  }

  render() {
    const { biodiversity } = this.props;
    return (
      <BiodiversityForm
        onFormSubmit={this.handleCreate}
        addField={(section, label, key) => this.addField(section, label, key)}
        addSection={(label, key) => this.addSection(label, key)}
        initialValues={{
          date: moment().format('YYYY-MM-DDTHH:mm'),
        }}
        dynamicForm={biodiversity.form}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
  addSection: (label, key) => dispatch(addSection(label, key)),
  addField: (section, label, key) => dispatch(addField(section, label, key)),
  addBiodiversity: (newBiodiversity, user) => dispatch(addBiodiversity(newBiodiversity, user)),
});

export default connect(state => ({ biodiversity: state.biodiversity, user: state.user }), mapDispatchToProps)(BiodiversityNew);

BiodiversityNew.propTypes = {
  biodiversity: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  addBiodiversity: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
