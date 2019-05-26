import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ProductionForm from './ProductionForm';
import {
  addProduction, addSection, addField, fetchDynamicForm,
} from '../../redux/production/productionActions';

class ProductionNew extends PureComponent {
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
    this.props.addProduction(values, user.user);
  }

  render() {
    const { production } = this.props;
    return (
      <ProductionForm
        onFormSubmit={this.handleCreate}
        addField={(section, label, key) => this.addField(section, label, key)}
        addSection={(label, key) => this.addSection(label, key)}
        initialValues={{
          date: moment().format('YYYY-MM-DDTHH:mm'),
        }}
        dynamicForm={production.form}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
  addSection: (label, key) => dispatch(addSection(label, key)),
  addField: (section, label, key) => dispatch(addField(section, label, key)),
  addProduction: (newProduction, user) => dispatch(addProduction(newProduction, user)),
});

export default connect(state => ({ production: state.production, user: state.user }), mapDispatchToProps)(ProductionNew);

ProductionNew.propTypes = {
  production: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  addProduction: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
