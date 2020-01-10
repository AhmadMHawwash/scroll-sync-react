import React from 'react';

export const Banner = ({ backgroundColor = 'grey', title = '', fontSize = '30px' }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '50px',
        backgroundColor,
        fontSize,
      }}
    >
      {title}
    </div>
  );
};
