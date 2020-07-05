import { last } from 'ramda';
import React, { Component } from 'react';
import ReactGA from 'react-ga';

import { Timer } from '../../types';
import {
  NB_COLUMN_CLOCKS,
  ANIMATION_TIME,
  CLOCK_PADDING,
  CLOCK_MAX_SIZE,
} from '../../config';

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

type ClockClock24Props = {};
type ClockClock24State = {
  timer: Timer;
  animationTime: number;
  clockSize: number;
  clockPadding: number;
};

const getClockSize = (): number => {
  const { clientWidth } = document.body;
  const paddingClock = clientWidth >= 1100 ? 30 : 10;
  const screenClockSize: number =
    (document.body.clientWidth -
      2 * paddingClock -
      2 * CLOCK_PADDING * NB_COLUMN_CLOCKS) /
    NB_COLUMN_CLOCKS;

  return screenClockSize < CLOCK_MAX_SIZE ? screenClockSize : CLOCK_MAX_SIZE;
};

export default class ClockClock24 extends Component<
  ClockClock24Props,
  ClockClock24State
> {
  private timeout?: Timeout;
  state: ClockClock24State = {
    timer: getTimeTimer(),
    clockSize: getClockSize(),
    clockPadding: CLOCK_PADDING,
    animationTime: ANIMATION_TIME,
  };

  componentDidMount(): void {
    this.startNextCycle(1000);

    window.addEventListener('resize', () => {
      ReactGA.event({
        category: 'Window',
        action: 'Resize',
      });
      this.setState({ clockSize: getClockSize() });
    });
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
    const { animationTime } = this.state;

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
    const { timer, clockSize } = this.state;

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
