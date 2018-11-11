import React from 'react';

import Clock from '../Clock/Clock';

/**
 * Display a single clock block
 * @param {Array} clocks - Set of clocks that compose the line
 * @param { Object } options - Clocks Options
 */
export default function NumberLineClock(clock, options) {
  return (
    <div className="clockclock24_number_line_clock">
      <Clock
        hours={clock.hours}
        minutes={clock.minutes}
        animationTime={clock.animationTime}
        defaultAnimationTime={options.defaultAnimationTime}
        animationDelay={clock.animationDelay}
        animationType={clock.animationType}
        size={options.clockSize}
      />
    </div>
  );
}
