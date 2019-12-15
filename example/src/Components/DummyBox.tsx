import React from 'react';

export const DumyBox = ({ width = 100, height = 100 }) => (
  <div style={{ flex: '0 0 auto', width, height }}>
    <h2>Card</h2>
  </div>
);

export default DumyBox;
