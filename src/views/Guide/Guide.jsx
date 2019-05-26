import React from 'react';

const guide = require('../../assets/guide.pdf');

const Guide = () => (
  <embed
    src={guide}
    height="750"
    width="900"
  />
);

export default Guide;
