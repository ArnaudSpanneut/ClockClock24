import React from 'react';
import { Number as NumberT } from '../../types';

import { NumberLines } from './NumberLines';

/**
 * The number to display
 * @param {line} numberLines - Set of line to form the number
 * @param {Object} options  - Clocks options
 */
export const Number: React.FC<{
  numberLines: NumberT;
  options: {
    clockSize: number;
  };
}> = ({ numberLines, options }) => (
  <div className="clockclock24_number">
    <div className="number">
      <NumberLines numberLines={numberLines} options={options} />
    </div>
  </div>
);
