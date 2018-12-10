import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ClockClock24 from './components/ClockClock24/ClockClock24';
import config from './config';

const screenClockSize = (document.body.clientWidth / 8) - config.CLOCK_PADDING - 10;

const clockSize = (screenClockSize < config.CLOCK_SIZE)
  ? screenClockSize
  : config.CLOCK_SIZE;

ReactDOM.render(
  <div className="container">
    <ClockClock24
      clockSize={clockSize}
      clockPadding={config.CLOCK_PADDING}
      animationTime={config.ANIMATION_TIME}
    />
  </div>,
  document.getElementById('root'),
);
