import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ClockClock24 from './components/ClockClock24/ClockClock24';
import config from './config';

ReactDOM.render(
  <div className="container">
    <ClockClock24
      clockSize={config.CLOCK_SIZE}
      clockPadding={config.CLOCK_PADDING}
      animationTime={config.ANIMATION_TIME}
    />
  </div>,
  document.getElementById('root'),
);
