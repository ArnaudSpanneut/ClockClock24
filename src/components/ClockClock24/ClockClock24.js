import React, { Component } from 'react';

import './clockClock24.css';

import NUMBERS from '../../constants/numbers';
import SHAPES from '../../constants/shapes';

import {
  startimeout,
  runSequences,
  getArrTime,
  getClockSize,
  updateClocksProperties,
  findClock,
} from '../../utils';

import Number from './Number';
import ButtonTest from './ButtonTest';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60000;
const ANIMATION_DELAY = 300;

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
const computeDelays = (numbers, animationTime, delay = 0) => (
  updateClocksProperties(numbers, (clock, clockIndex, clockLinesIndex, numberIndex) => {
    const clockDelay = ((numberIndex * 2) + clockIndex) * delay;
    return {
      ...clock,
      animationTime: animationTime + (numbers.length * delay) - clockDelay,
      animationDelay: clockDelay,
    };
  })
);
const setAnimationType = (numbers, animationType) => (
  updateClocksProperties(numbers, clock => ({
    ...clock,
    animationType,
  }))
);
const calculRotation = (start, end) => 360 - ((start % 360) - end);
const computeRotation = (numbers, prevNumbers) => (
  updateClocksProperties(numbers, (clock, clockIndex, clockLinesIndex, numberIndex) => {
    const { hours, minutes } = prevNumbers[numberIndex][clockLinesIndex][clockIndex];
    const nextHours = hours + calculRotation(hours, clock.hours);
    const nextMinutes = minutes + calculRotation(minutes, clock.minutes);
    return {
      ...clock,
      hours: nextHours,
      minutes: nextMinutes,
    };
  })
);
const getMaxAnimationTime = numbers => (
  findClock(numbers, (a, b) => a.animationTime < b.animationTime).animationTime
);
/**
 * Play a set of animations for clocks
 * @param {Function} setStateFunc - React set state function
 * @return {Promise} Next startDancing method
 */
const startDancing = (animationTime, prevNumbers, cb) => {
  const setStateTimeout = (numbers) => {
    const maxAnimationTime = getMaxAnimationTime(numbers) || animationTime;

    cb({ numbers });
    return startimeout(maxAnimationTime - 5).then(() => numbers);
  };
  const numbersState = [
    getCustomValues(),
    SHAPES[0],
    getTimeValues(),
  ];
  const rotationsState = numbersState
    .reduce((acc, arr, index) => {
      const prev = acc[index - 1] || prevNumbers;

      return acc.concat([computeRotation(arr, prev)]);
    }, []);

  // Sequence of animations
  const sequences = [
    () => setStateTimeout(setAnimationType(computeDelays(rotationsState[0], animationTime, ANIMATION_DELAY), 'start')),
    () => setStateTimeout(computeDelays(rotationsState[1], animationTime, 0)),
    () => setStateTimeout(setAnimationType(computeDelays(rotationsState[2], animationTime, 0), 'end')),
  ];

  return runSequences(sequences)
    .then(() => nextTime())
    .then(() => startDancing(animationTime, rotationsState[2], cb));
};

export default class ClockClock24 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: getTimeValues(),
    };
  }

  componentDidMount() {
    const { animationTime } = this.props;
    const { numbers } = this.state;

    this.timeout = nextTime()
      .then(() => startDancing(animationTime, numbers, state => this.setState(state)));

    return this.timeout;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { numbers } = this.state;
    const { clockSize, clockPadding, animationTime } = this.props;
    const { height, width } = getClockSize(clockSize, clockPadding);
    const clockStyle = {
      height,
      width,
    };

    const onTestClick = () => startDancing(animationTime, numbers, state => this.setState(state));

    return (
      <div className="clockclock24_container">
        { ButtonTest(onTestClick) }
        <div className="clockclock24" style={clockStyle}>
          {numbers
            .map(number => Number(number, { clockSize, defaultAnimationTime: animationTime }))
          }
        </div>
      </div>
    );
  }
}
