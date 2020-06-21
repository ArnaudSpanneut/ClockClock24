import { last } from 'ramda';
import React, { Component } from 'react';

import { Timer } from '../../types';

import './clockClock24.css';

import {
  startimeout,
  runSequences,
  getMaxAnimationTime,
  Timeout,
} from '../../utils';
import { run, resetTimer } from '../../services/engine';
import { getTimeTimer } from '../../services/timers';

import { Number } from './../Number/Number';
import { ButtonTest } from './ButtonTest';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60 * ONE_MILLI;

/**
 * Get the remaining time before the time change
 * @return Remaining time
 */
const getRemainingTime = (): number => {
  const secondsInMilli = new Date().getSeconds() * ONE_MILLI;
  return ONE_MINUTES_IN_MILLI - secondsInMilli;
};

type ClockClock24Props = {
  animationTime: number;
  clockSize: number;
  clockPadding: number;
};
type ClockClock24State = { timer: Timer };

export default class ClockClock24 extends Component<
  ClockClock24Props,
  ClockClock24State
> {
  private timeout?: Timeout;
  state: ClockClock24State = {
    timer: getTimeTimer(),
  };

  componentDidMount(): void {
    this.startNextCycle(1000);
  }

  componentWillUnmount(): void {
    this.cancelTimeout();
  }

  startNextCycle(time: number) {
    this.timeout = startimeout(time);

    this.timeout.promise.then(() => this.startCycle());
  }

  animateTimer(timer: Timer): Promise<unknown> {
    const animationTime = getMaxAnimationTime(timer);

    this.setState({ timer });
    this.timeout = startimeout(animationTime);

    return this.timeout.promise;
  }

  startCycle(): void {
    const { animationTime } = this.props;

    this.cancelTimeout();

    const sequences = run(this.state.timer, { animationTime });
    const sequencesPromise = sequences.map((timer: Timer) => () =>
      this.animateTimer(timer),
    );

    runSequences(sequencesPromise).then(() => {
      const lastTimer = last(sequences);
      if (!lastTimer) {
        return null;
      }

      const clearTimer = resetTimer(lastTimer);
      this.setState({ timer: clearTimer });

      return this.nextTime();
    });
  }

  nextTime(): void {
    this.startNextCycle(getRemainingTime());
  }

  cancelTimeout(): void {
    if (this.timeout) {
      this.timeout.cancel();
    }
  }

  onAnimateClick(): void {
    this.startCycle();
  }

  render() {
    const { timer } = this.state;
    const { clockSize } = this.props;

    return (
      <div className="clockclock24_container">
        <div className="clockclock24">
          {timer.map((number, index) => (
            <Number key={index} numberLines={number} options={{ clockSize }} />
          ))}
        </div>
        <ButtonTest onClick={() => this.onAnimateClick()} />
      </div>
    );
  }
}
