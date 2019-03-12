import React, { PureComponent } from 'react';

import WaterForm from './WaterForm';

class WaterNew extends PureComponent {
  handleCreate(values) {
    console.log(values);
  }

  render() {
    return (
      <WaterForm
        onFormSubmit={this.handleCreate}
      />
    );
  }
}

export default WaterNew;
