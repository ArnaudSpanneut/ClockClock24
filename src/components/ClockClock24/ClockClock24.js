import React from 'react';
import './clockClock24.css';

import Number from './../Number/Number';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60000;
const CUSTOMS_TIMES = {
  oblique: [10, 10, 10, 10],
};

export default class ClockClock24 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.getTime(),
    }
  }
  componentDidMount() {
    this.playTimes();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  playTimes(times = []) {
    const currentTime = new Date(Date.now() + 10000);
    const secondsInMilli = currentTime.getSeconds() * ONE_MILLI;
    const customTimeout = (times.length) ?
      times.reduce((totalTime, time) => totalTime += time.timeout, 0) :
      0;
    const nextTimeout = ONE_MINUTES_IN_MILLI - secondsInMilli - customTimeout;

    times = times
      .concat([{ timeout: nextTimeout }])

    this.startTimeout(times)
      .then(() => this.timeChange());
  }
  timeChange() {
    this.playTimes([
      { time: CUSTOMS_TIMES.oblique, timeout: 11 * ONE_MILLI },
    ])
  }
  startTimeout(times) {
    return times
      .reduce((promise, time, index) => {
        return promise
          .then(() => {
            this.setState({ time: time.time || this.getTime() });

            return new Promise((resolve, reject) => {
              this.timeout = setTimeout(resolve, time.timeout);
            });
          });
      }, Promise.resolve());
  }
  getTime() {
    const time = new Date(Date.now());
    const timeToString = time.toTimeString()
      .slice(0, 5)
      .replace(':', '');
    const timeArray = Array.apply(null, Array(4))
      .map((val, index) => timeToString.charAt(index));

    return timeArray;
  }
  render() {
    const { time } = this.state;

    return <div className="clockclock24">
      { time
          .map((number, index) => <div className="clockclock24_number" key={index}>
            <Number number={number} />
          </div>)
      }
    </div>;
  }
}
