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
  getLastArrItem,
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
  let timeout = null;
  const numbersState = [
    getCustomValues(),
    SHAPES[0],
    getTimeValues(),
  ];

  const setStateTimeout = (numbers) => {
    const maxAnimationTime = getMaxAnimationTime(numbers) || animationTime;
    timeout = startimeout(maxAnimationTime - 5);

    cb({ numbers });
    return timeout.promise.then(() => numbers);
  };
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
  const promise = runSequences(sequences)
    .then(() => {
      timeout = nextTime();
      return timeout.promise;
    })
    .then(() => {
      timeout = startDancing(animationTime, getLastArrItem(rotationsState), cb);
      return timeout.promise;
    });

  return {
    promise,
    cancel: () => ((timeout) ? timeout.cancel() : false),
  };
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
    const timeout = nextTime();

    this.timeout = timeout;
    return timeout.promise
      .then(() => startDancing(animationTime, numbers, state => this.setState(state)));
  }

  componentWillUnmount() {
    this.cancelTimeout();
  }

  cancelTimeout() {
    if (this.timeout) {
      this.timeout.cancel();
    }
  }

  render() {
    const { numbers } = this.state;
    const { clockSize, clockPadding, animationTime } = this.props;
    const { height, width } = getClockSize(clockSize, clockPadding);
    const clockStyle = {
      height,
      width,
    };

    const onTestClick = () => {
      this.cancelTimeout();
      this.timeout = startDancing(animationTime, numbers, state => this.setState(state));
      return true;
    };

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
