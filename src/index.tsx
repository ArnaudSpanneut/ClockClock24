import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './index.css';

import ClockClock24 from './components/ClockClock24/ClockClock24';

if (process.env.NODE_ENV !== 'development') {
  ReactGA.initialize('UA-16651963-11');
}

ReactDOM.render(
  <div className="container">
    <div className="rotate_info">
      Rotate your phone for a better experience
      <span role="img" aria-label="rotate" className="rotate_info__emoji">
        🔄
      </span>
    </div>
    <ClockClock24 />
    <p className="global_info">
      Made with{' '}
      <span role="img" aria-label="heart">
        ❤️
      </span>{' '}
      by{' '}
      <a
        href="http://arnaudspanneut.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Arnaud Spanneut
      </a>{' '}
      •{' '}
      <a
        href="https://github.com/ArnaudSpanneut/ClockClock24"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
    </p>
  </div>,
  document.getElementById('root'),
);
