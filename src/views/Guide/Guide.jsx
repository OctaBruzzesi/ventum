import React from 'react';
import { Document } from 'react-pdf';

const guide = require('../../assets/guide.pdf');

console.log(guide);

const Guide = () => (
  <embed
    src={guide}
    height="750"
    width="900"
  />
);

export default Guide;
