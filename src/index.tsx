import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ClockClock24 from './components/ClockClock24/ClockClock24';
import config from './config';

const NB_COLUMN_CLOCKS = 8;

const { clientWidth } = document.body;
const paddingClock = clientWidth >= 1100 ? 30 : 10;
const screenClockSize: number =
  (document.body.clientWidth -
    2 * paddingClock -
    2 * config.CLOCK_PADDING * NB_COLUMN_CLOCKS) /
  NB_COLUMN_CLOCKS;

const clockSize: number =
  screenClockSize < config.CLOCK_MAX_SIZE
    ? screenClockSize
    : config.CLOCK_MAX_SIZE;

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
