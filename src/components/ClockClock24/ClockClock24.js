import React, { Component } from 'react';

import './clockClock24.css';

import NUMBERS from '../../constants/numbers';
import SHAPES from '../../constants/shapes';

import {
  startimeout,
  runSequences,
  getArrTime,
  getClockSize,
} from '../../utils';

import Clock from '../Clock/Clock';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60000;

/**
 * Get the clocks config depends of the number
 * @return {Array} Clocks config
 */
const getTimeValues = () => getArrTime()
  .map(line => NUMBERS[line]);
/**
 * Get a random set of configuration to display forms
 * @return {Array} Clocks config
 */
const getCustomValues = () => {
  const max = SHAPES.length - 1;
  const randomIndex = Math.floor(Math.random() * (max + 1));

  return SHAPES[randomIndex];
};
/**
 * Get the remaining time before the time change
 * @return {Number} Remaining time
 */
const getRemainingTime = () => {
  const currentTime = new Date();
  const secondsInMilli = currentTime.getSeconds() * ONE_MILLI;
  return ONE_MINUTES_IN_MILLI - secondsInMilli;
};
/**
 * Waiting for the next minute
 * @return {Promise} Remaining time
 */
const nextTime = () => startimeout(getRemainingTime());
const computeDelays = (numbers, animationTime) => {
  const delay = 500;

  return numbers
    .map((number, numberIndex) => number
      .map(clockLines => clockLines
        .map((clock, clockIndex) => {
          const clockDelay = ((numberIndex * 2) + clockIndex) * delay;
          return {
            ...clock,
            animationTime: animationTime - clockDelay,
            animationDelay: clockDelay,
          };
        })));
};
/**
 * Play a set of animations for clocks
 * @param {Function} setStateFunc - React set state function
 * @return {Promise} Next startDancing method
 */
const startDancing = (animationTime, cb) => {
  const setStateTimeout = (numbers) => {
    cb({ numbers });
    return startimeout(animationTime);
  };
  // Sequence of animations
  const sequences = [
    () => setStateTimeout(computeDelays(getCustomValues(), animationTime)),
    () => setStateTimeout(SHAPES[0]),
    () => setStateTimeout(getTimeValues()),
  ];

  return runSequences(sequences)
    .then(() => nextTime())
    .then(() => startDancing(animationTime, cb));
};
// Components
/**
 * Display a single clock block
 * @param {Array} clocks - Set of clocks that compose the line
 * @param { Object } options - Clocks Options
 */
const NumberLineClock = (clock, options) => (
  <div className="clockclock24_number_line_clock">
    <Clock
      hours={clock.hours}
      minutes={clock.minutes}
      animationTime={clock.animationTime}
      animationDelay={clock.animationDelay}
      size={options.clockSize}
      minutesRandom={options.minutesRandom}
      hoursRandom={options.hoursRandom}
    />
  </div>
);
/**
 * Display a line of 2 clocks to form a number
 * @param {Array} numberLines - Number lines (group by 2 clocks)
 * @param {Object} options - Clocks options
 */
const NumberLines = (numberLines, options) => (
  numberLines
    .map((numberLine, index) => (
      <div
        className="clockclock24_number_line"
        key={index}
      >
        {numberLine
          .map(clock => NumberLineClock(clock, options))
        }
      </div>
    ))
);
/**
 * The number to display
 * @param {line} numberLines - Set of line to form the number
 * @param {Object} options  - Clocks options
 */
const Number = (numberLines, options) => (
  <div className="clockclock24_number">
    <div className="number">
      {NumberLines(numberLines, options)}
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
      numbers: getTimeValues(),
    };
  }

  componentDidMount() {
    const { animationTime } = this.props;

    this.timeout = nextTime()
      .then(() => startDancing(animationTime, state => this.setState(state)));

    return this.timeout;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { numbers } = this.state;
    const { clockSize, clockPadding, animationTime } = this.props;
    const hoursRandom = Math.floor(Math.random() * 2) + 1;
    const minutesRandom = Math.floor(Math.random() * 2) + 1;
    const { height, width } = getClockSize(clockSize, clockPadding);
    const clockStyle = {
      height,
      width,
    };

    const onTestClick = () => startDancing(animationTime, state => this.setState(state));

    return (
      <div className="clockclock24_container">
        { ButtonTest(onTestClick) }
        <div className="clockclock24" style={clockStyle}>
          {numbers
            .map(number => Number(number, {
              clockSize,
              minutesRandom,
              hoursRandom,
            }))
          }
        </div>
      </div>
    );
  }
}
