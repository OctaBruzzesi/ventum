import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import WaterForm from './WaterForm';
import { addWater } from '../../redux/water/waterActions';

class WaterNew extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(values) {
    this.props.addWater(values);
  }

  render() {
    return (
      <WaterForm
        onFormSubmit={this.handleCreate}
        initialValues={{
          date: moment().format('YYYY-MM-DDTHH:mm'),
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addWater: newWater => dispatch(addWater(newWater)),
});

export default connect(null, mapDispatchToProps)(WaterNew);
