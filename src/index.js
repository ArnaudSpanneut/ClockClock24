import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ClockClock24 from './components/ClockClock24/ClockClock24';

const ANIMATION_TIME = 5;
const CLOCK_SIZE = 150;
const CLOCK_PADDING = 2;

const totalClockSize = CLOCK_SIZE + (CLOCK_PADDING * 2);
const height = totalClockSize * 3;
const width = totalClockSize * 8;
const clockStyle = {
  height,
  width,
  top: `calc(50% - (${height}px / 2))`,
  right: `calc(50% - (${width}px / 2))`,
}

ReactDOM.render(
  <div className="container" style={clockStyle}>
    <ClockClock24 clockSize={CLOCK_SIZE} animationTime={ANIMATION_TIME} />
  </div>,
  document.getElementById('root')
);
