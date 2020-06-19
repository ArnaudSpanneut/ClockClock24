import React from 'react';
import { Clock as ClockT } from '../../types';

import { Clock } from '../Clock/Clock';

/**
 * Display a single clock block
 * @param {Array} clocks - Set of clocks that compose the line
 * @param { Object } options - Clocks Options
 */
export const NumberLineClock: React.FC<{
  clock: ClockT;
  options: {
    clockSize: number;
  };
}> = ({ clock, options }) => (
  <div className="clockclock24_number_line_clock">
    <Clock
      clock={clock}
      size={options.clockSize}
    />
  </div>
);
