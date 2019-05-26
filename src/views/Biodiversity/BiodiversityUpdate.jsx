import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BiodiversityForm from './BiodiversityForm';
import {
  addSection, addField, fetchDynamicForm, editBiodiversity,
} from '../../redux/biodiversity/biodiversityActions';

class BiodiversityUpdate extends PureComponent {
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

    this.props.editBiodiversity(location.state.id, values, user.user);
  }

  render() {
    const { biodiversity, location } = this.props;

    return (
      location.state.biodiversity ? (
        <BiodiversityForm
          onFormSubmit={this.handleEdit}
          addField={(section, label, key) => this.addField(section, label, key)}
          addSection={(label, key) => this.addSection(label, key)}
          initialValues={{
            ...location.state.biodiversity,
          }}
          dynamicForm={biodiversity.form}
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
  editBiodiversity: (id, newBiodiversity, user) => dispatch(editBiodiversity(id, newBiodiversity, user)),
});

export default connect(state => ({ biodiversity: state.biodiversity, user: state.user }), mapDispatchToProps)(BiodiversityUpdate);

BiodiversityUpdate.propTypes = {
  biodiversity: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  editBiodiversity: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
