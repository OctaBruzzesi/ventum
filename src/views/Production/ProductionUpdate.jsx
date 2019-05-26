import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductionForm from './ProductionForm';
import {
  addSection, addField, fetchDynamicForm, editProduction,
} from '../../redux/production/productionActions';

class ProductionUpdate extends PureComponent {
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

    this.props.editProduction(location.state.id, values, user.user);
  }

  render() {
    const { production, location } = this.props;

    return (
      location.state.production ? (
        <ProductionForm
          onFormSubmit={this.handleEdit}
          addField={(section, label, key) => this.addField(section, label, key)}
          addSection={(label, key) => this.addSection(label, key)}
          initialValues={{
            ...location.state.production,
          }}
          dynamicForm={production.form}
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
  editProduction: (id, newProduction, user) => dispatch(editProduction(id, newProduction, user)),
});

export default connect(state => ({ production: state.production, user: state.user }), mapDispatchToProps)(ProductionUpdate);

ProductionUpdate.propTypes = {
  production: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  editProduction: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
