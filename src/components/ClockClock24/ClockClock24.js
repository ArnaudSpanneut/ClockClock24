import React from 'react';
import './clockClock24.css';

import Number from './../Number/Number';

const numbers = Array.apply(null, Array(10));

export default class ClockClock24 extends React.Component {
  render() {
    return numbers
      .map((number, index) => <div className="clockclock24_number">
        <Number number={index} />
      </div>);
  }
}
