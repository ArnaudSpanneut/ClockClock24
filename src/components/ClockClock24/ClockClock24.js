import React from 'react';
import './clockClock24.css';

import Number from './../Number/Number';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60000;

export default class ClockClock24 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.getTime(),
    }
  }
  componentDidMount() {
    this.startTimeout();
  }
  startTimeout() {
    const time = new Date(Date.now() + 10000);
    const secondsInMilli = time.getSeconds() * ONE_MILLI;

    this.timeout = setTimeout(() => {
      this.setState({ time: this.getTime() });
      this.startTimeout();
    }, ONE_MINUTES_IN_MILLI - secondsInMilli);
  }
  getTime() {
    const time = new Date(Date.now() + 10000);
    const timeToString = time.toTimeString()
      .slice(0, 5)
      .replace(':', '');
    const timeArray = Array.apply(null, Array(4))
      .map((val, index) => timeToString.charAt(index));

    console.log();
    return timeArray;
  }
  render() {
    const { time } = this.state;

    return <div className="clockclock24">
      { time
          .map((number, index) => <div className="clockclock24_number" key="index">
            <Number number={number} />
          </div>)
      }
    </div>;
  }
}
