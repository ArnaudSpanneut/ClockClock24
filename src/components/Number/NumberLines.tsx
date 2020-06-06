import React, { ReactElement } from 'react';
import { Number, Line } from '../../types';

import { NumberLineClock } from './NumberLineClock';

/**
 * Display a line of 2 clocks to form a number
 */
export const NumberLines: React.FC<{
  numberLines: Number;
  options: {
    clockSize: number;
    defaultAnimationTime: number;
  };
}> = ({ numberLines, options }): ReactElement => (
  <div>
    {numberLines.map((numberLine: Line, index: number) => (
      <div className="clockclock24_number_line" key={index}>
        {numberLine.map((clock, indexC: number) => (
          <NumberLineClock
            clock={clock}
            options={options}
            key={index + indexC}
          />
        ))}
      </div>
    ))}
  </div>
);
