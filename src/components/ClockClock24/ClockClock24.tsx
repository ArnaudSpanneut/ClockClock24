import { last } from 'ramda';
import React, { Component } from 'react';

import { Timer } from '../../types';

import './clockClock24.css';

import {
  startimeout,
  runSequences,
  getMaxAnimationTime,
  getRandomBoolean,
} from '../../utils';
import {
  computeSequences,
  computeClearRotations,
} from '../../services/clockclock';
import { getTimers, getTimeTimer } from '../../services/timers';

import Number from './Number';
import ButtonTest from './ButtonTest';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60 * ONE_MILLI;

/**
 * Get the remaining time before the time change
 * @return {Number} Remaining time
 */
const getRemainingTime = (): number => {
  const secondsInMilli = new Date().getSeconds() * ONE_MILLI;
  return ONE_MINUTES_IN_MILLI - secondsInMilli;
};
/**
 * Waiting for the next minute
 * @return Remaining time
 */
const nextTime = () => startimeout(getRemainingTime());
/**
 * Play a set of animations for clocks
 */
const startDancing = (
  animationTime: number,
  prevNumbers: Timer,
  onChange: ({ numbers }: { numbers: Timer }) => void,
): {
  promise: Promise<Timer>;
  cancel: () => void;
} => {
  const timers = getTimers();

  let timeout: any = null;

  const setStateTimeout = async (numbers: Timer) => {
    const maxAnimationTime = getMaxAnimationTime(numbers) || animationTime;
    timeout = startimeout(maxAnimationTime);

    onChange({ numbers });
    await timeout.promise;

    return numbers;
  };

  // Sequence of animations
  const sequenceOptions = { animationTime, isReverse: getRandomBoolean() };
  const sequences = computeSequences(timers, prevNumbers, sequenceOptions);
  const sequencesPromise = sequences.map((numbers: Timer) => () =>
    setStateTimeout(numbers),
  );

  const promise = runSequences(sequencesPromise)
    .then(() => {
      const lastNumbers = last(sequences);
      if (!lastNumbers) {
        return false;
      }

      const cleanNumbers = computeClearRotations(lastNumbers);
      onChange({ numbers: cleanNumbers });

      timeout = nextTime();
      return timeout.promise.then(() => cleanNumbers);
    })
    .then((lastNumbers) => {
      timeout = startDancing(animationTime, lastNumbers, onChange);
      return timeout.promise;
    });

  return {
    promise,
    cancel: () => {
      if (timeout) {
        timeout.cancel();
      }
    },
  };
};

type ClockClock24Props = {
  animationTime: number;
  clockSize: number;
  clockPadding: number;
};

export default class ClockClock24 extends Component<
  ClockClock24Props,
  { numbers: Timer }
> {
  timeout?: any;

  constructor(props: ClockClock24Props) {
    super(props);

    this.state = {
      numbers: getTimeTimer(),
    };
  }

  componentDidMount(): Promise<void> {
    const { animationTime } = this.props;
    const { numbers } = this.state;

    this.timeout = nextTime();

    return this.timeout.promise.then(() =>
      startDancing(animationTime, numbers, (state) => this.setState(state)),
    );
  }

  componentWillUnmount(): void {
    this.cancelTimeout();
  }

  cancelTimeout(): void {
    if (this.timeout) {
      this.timeout.cancel();
    }
  }

  render() {
    const { numbers } = this.state;
    const { clockSize, animationTime } = this.props;

    const onTestClick = (): void => {
      this.cancelTimeout();
      this.timeout = startDancing(animationTime, numbers, (state) =>
        this.setState(state),
      );
    };

    return (
      <div className="clockclock24_container">
        <div className="clockclock24">
          {numbers.map((number, index) => (
            <Number
              key={index}
              numberLines={number}
              options={{ clockSize, defaultAnimationTime: animationTime }}
            />
          ))}
        </div>
        <ButtonTest onClick={onTestClick} />
      </div>
    );
  }
}
