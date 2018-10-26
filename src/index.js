import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ClockClock24 from './components/ClockClock24/ClockClock24';
import config from './config';

const totalClockSize = config.CLOCK_SIZE + (config.CLOCK_PADDING * 2);
const height = totalClockSize * 3;
const width = totalClockSize * 8;
const clockStyle = {
  height,
  width,
  top: `calc(50% - (${height}px / 2))`,
  right: `calc(50% - (${width}px / 2))`,
}

ReactDOM.render(
  <div className="container"
    style={clockStyle}>
    <ClockClock24
      clockSize={config.CLOCK_SIZE}
      animationTime={config.ANIMATION_TIME} />
  </div>,
  document.getElementById('root')
);
