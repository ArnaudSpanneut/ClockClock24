import React from 'react';
import ReactDOM from 'react-dom';

import Clock from './components/Clock/Clock';

ReactDOM.render(
  <Clock hours="3" minutes="30" />,
  document.getElementById('root')
);
