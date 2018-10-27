import React from 'react';

import './clockClock24.css';

import NUMBERS from '../../constants/numbers';
import SHAPES from '../../constants/shapes';

import { startimeout, runSequences, getArrTime } from '../../utils';
import config from '../../config';

import Clock from '../Clock/Clock';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60000;

const getTimeValues = () => getArrTime()
  .map(line => NUMBERS[line].lines);

const getCustomValues = () => {
  const customKeys = Object.keys(SHAPES);
  const max = customKeys.length - 1;
  const randomIndex = Math.floor(Math.random() * (max + 1));
  const customKey = customKeys[randomIndex];

  return SHAPES[customKey]
    .map(line => line.lines);
};

export default class ClockClock24 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: getTimeValues(),
    };
  }

  componentDidMount() {
    this.nextTime();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  // Component Methods
  /**
   * Calculate the time remaining between the next time
   * and start the timeout
   */
  nextTime() {
    const currentTime = new Date(Date.now());
    const secondsInMilli = currentTime.getSeconds() * ONE_MILLI;
    const timeout = ONE_MINUTES_IN_MILLI - secondsInMilli;

    return startimeout(timeout, () => this.startDancing());
  }

  /**
   * Set the clocks moving to shapes
   */
  startDancing() {
    const sequences = [
      () => {
        this.setState({ lines: getCustomValues() });
        return startimeout(config.ANIMATION_TIME);
      },
      () => {
        this.setState({ lines: getTimeValues() });
        return startimeout(config.ANIMATION_TIME);
      },
    ];

    return runSequences(sequences)
      .then(() => this.nextTime());
  }

  // Displaying Components
  getNumberLines(lines) {
    return lines
      .map((clocks, index) => (
        <div
          className="clockclock24_number_line"
          key={index}
        >
          { this.getClocks(clocks) }
        </div>
      ));
  }

  getClocks(clocks) {
    const { clockSize, animationTime } = this.props;

    return clocks
      .map((clock, index) => (
        <div className="clockclock24_number_line_clock" key={index}>
          <Clock
            hours={clock.hours}
            minutes={clock.minutes}
            size={clockSize}
            animationTime={animationTime}
          />
        </div>
      ));
  }

  render() {
    const { lines } = this.state;

    return (
      <div className="clockclock24">
        { lines
          .map((line, index) => (
            <div className="clockclock24_number" key={index}>
              <div className="number">
                { this.getNumberLines(line) }
              </div>
            </div>
          ))
      }
      </div>
    );
  }
}
