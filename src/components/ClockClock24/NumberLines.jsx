import React from 'react';

import NumberLineClock from './NumberLineClock';

/**
 * Display a line of 2 clocks to form a number
 * @param {Array} numberLines - Number lines (group by 2 clocks)
 * @param {Object} options - Clocks options
 */
export default function NumberLines(numberLines, options) {
  return numberLines
    .map((numberLine, index) => (
      <div
        className="clockclock24_number_line"
        key={index}
      >
        {numberLine
          .map(clock => NumberLineClock(clock, options))
        }
      </div>
    ))
}
