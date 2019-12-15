import React from 'react';

export const DumyBox = ({ width = 100, height = 100, text = 'Card' }) => (
  <div style={{ flex: '0 0 auto', width, height }}>
    <h2>{text}</h2>
  </div>
);

export default DumyBox;
