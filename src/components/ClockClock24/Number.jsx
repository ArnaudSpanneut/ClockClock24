import React from 'react';

import NumberLines from './NumberLines';

/**
 * The number to display
 * @param {line} numberLines - Set of line to form the number
 * @param {Object} options  - Clocks options
 */
export default function Number(numberLines, options) {
  return (
    <div className="clockclock24_number">
      <div className="number">
        { NumberLines(numberLines, options) }
      </div>
    </div>
  );
}
