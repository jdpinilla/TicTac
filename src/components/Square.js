import React from 'react';

export const Square = ({ val, handleSquare }) => {
  return (
    <div className="square" onClick={handleSquare}>
      {val}
    </div>
  );
};
