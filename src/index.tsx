import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ClockClock24 from './components/ClockClock24/ClockClock24';

ReactDOM.render(
  <div className="container">
    <div className="rotate_info">
      Rotate your phone for a better experience
      <span role="img"aria-label="rotate"  className="rotate_info__emoji">🔄</span>
    </div>,
    <ClockClock24/>
  </div>,
  document.getElementById('root'),
);
