import React, { Component } from 'react';

import './clockClock24.css';

import NUMBERS from '../../constants/numbers';
import SHAPES from '../../constants/shapes';

import { startimeout, runSequences, getArrTime } from '../../utils';
import config from '../../config';

import Clock from '../Clock/Clock';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60000;

/**
 * Get the clocks config depends of the number
 */
const getTimeValues = () => getArrTime()
  .map(line => NUMBERS[line]);
/**
 * Get a random set of configuration to display forms
 */
const getCustomValues = () => {
  const customKeys = Object.keys(SHAPES);
  const max = customKeys.length - 1;
  const randomIndex = Math.floor(Math.random() * (max + 1));
  const customKey = customKeys[randomIndex];

  return SHAPES[customKey];
};
/**
 * Get the remaining time before the time change
 */
const getRemainingTime = () => {
  const currentTime = new Date(Date.now());
  const secondsInMilli = currentTime.getSeconds() * ONE_MILLI;
  return ONE_MINUTES_IN_MILLI - secondsInMilli;
};
const nextTime = cb => startimeout(getRemainingTime(), cb);
/**
 * Play a set of animations for clocks
 * @param {Function} setStateFunc - React set state function
 */
const startDancing = (setStateFunc) => {
  const setStateTimeout = (lines) => {
    setStateFunc({ lines });
    return startimeout(config.ANIMATION_TIME);
  };
  // Sequence of animations
  const sequences = [
    () => setStateTimeout(getCustomValues()),
    () => setStateTimeout(SHAPES.oblique),
    () => setStateTimeout(getTimeValues()),
  ];

  return runSequences(sequences)
    .then(() => nextTime(() => startDancing(setStateFunc)));
};
// Components
/**
 * Display a single clock block
 * @param {Array} clocks - Set of clocks that compose the line
 * @param { Object } options - Clocks Options
 */
const Clocks = (clock, options) => (
  <div className="clockclock24_number_line_clock">
    <Clock
      hours={clock.hours}
      minutes={clock.minutes}
      size={options.clockSize}
      animationTime={options.animationTime}
      minutesRandom={options.minutesRandom}
      hoursRandom={options.hoursRandom}
    />
  </div>
);
/**
 * Display a line of 2 clocks to form a number
 * @param {Array} lines - Number lines (group by 2 clocks)
 * @param {Object} options - Clocks options
 */
const NumberLines = (lines, options) => (
  lines
    .map((clocks, index) => (
      <div
        className="clockclock24_number_line"
        key={index}
      >
        {clocks
          .map(clock => Clocks(clock, options))
        }
      </div>
    ))
);
/**
 * The number to display
 * @param {line} lines - Set of line to form the number
 * @param {*} options  - Clocks options
 */
const Number = (lines, options) => (
  <div className="clockclock24_number">
    <div className="number">
      {NumberLines(lines, options)}
    </div>
  </div>
);
/**
 * Button to launch animations
 */
const ButtonTest = onClick => (
  <button
    className="clockclock24_test_button"
    type="button"
    onClick={() => onClick()}
  >
    Dance&nbsp;
    <span role="img" aria-label="dance">💃</span>
  </button>
);

export default class ClockClock24 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: getTimeValues(),
    };
  }

  componentDidMount() {
    nextTime(() => startDancing(state => this.setState(state)));
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { lines } = this.state;
    const { clockSize, animationTime } = this.props;
    const hoursRandom = Math.floor(Math.random() * 2) + 1;
    const minutesRandom = Math.floor(Math.random() * 2) + 1;

    return (
      <div className="clockclock24_container">
        { ButtonTest(() => startDancing(state => this.setState(state))) }
        <div className="clockclock24">
          { lines
            .map(line => Number(line, {
              clockSize, animationTime, minutesRandom, hoursRandom,
            }))
          }
        </div>
      </div>
    );
  }
}
