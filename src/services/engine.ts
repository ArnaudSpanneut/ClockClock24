import { last } from 'ramda';
import { Timer, Clock, AnimationType, Line, Number } from '../types';
import { getRandomBoolean } from '../utils';
import { getTimers, getTimeTimer } from './timers';

const NB_NUMBERS = 4;
const ANIMATION_DELAY = 300;
const MIN_ROTATION = 180;

export type Sequence = {
  timer: Timer;
  type: 'time' | 'wait' | 'shape';
  animationTime: number;
  delay?: number;
  ltr?: boolean;
  isReverse?: boolean;
};

const isNeg = (nb: number): boolean => Math.sign(nb) === -1;
const roundRest = (restRotation: number): number => {
  const restRound = Math.abs(restRotation);
  const round = restRound >= 360 + MIN_ROTATION ? restRound - 360 : restRound;

  return isNeg(restRotation) ? -round : round;
};
const getStartPosition = (start: number): number =>
  isNeg(start) ? 360 + (start % 360) : start % 360;
const getMinValue = (rest: number): number => (rest === 0 ? 360 : rest);

export const rotate = (start: number, end: number) =>
  start + roundRest(360 - (getStartPosition(start) - end));
export const rotateReverse = (start: number, end: number) =>
  start + roundRest(-getMinValue(getStartPosition(start)) + (end - 360));

const updateClocksProperties = (
  numbers: Timer,
  cb: (clock: Clock, xPos: number, yPos: number) => Clock,
): Timer =>
  numbers.map(
    (number, numberIndex) =>
      number.map(
        (clockLines, clockLinesIndex) =>
          clockLines.map((clock, clockIndex) =>
            cb(clock, numberIndex * 2 + clockIndex, clockLinesIndex),
          ) as Line,
      ) as Number,
  ) as Timer;

export const setClockDelay = (
  clock: Clock,
  xPos: number,
  animationTime: number,
  delay = 0,
) => {
  const animationDelay = xPos * delay;
  return {
    ...clock,
    animationDelay,
    animationTime: animationTime + NB_NUMBERS * delay - animationDelay,
  };
};
const computeDelays = (
  timer: Timer,
  animationTime: number,
  delay?: number,
  rtl = false,
) =>
  updateClocksProperties(timer, (c, xPos) =>
    setClockDelay(c, rtl ? NB_NUMBERS * 2 - xPos : xPos, animationTime, delay),
  );

const computeAnimationType = (timer: Timer, animationType: AnimationType) =>
  updateClocksProperties(timer, (clock) => ({
    ...clock,
    animationType,
  }));

export const rotateClock = (
  clock: Clock,
  { hours: currentHours, minutes: currentMinutes }: Clock,
  isMinutesReversed = false,
) => ({
  ...clock,
  hours: rotate(currentHours, clock.hours),
  minutes: isMinutesReversed
    ? rotateReverse(currentMinutes, clock.minutes)
    : rotate(currentMinutes, clock.minutes),
});
const computeRotation = (
  timer: Timer,
  curTimer: Timer,
  { isMinutesReversed = false } = {},
) =>
  updateClocksProperties(timer, (c, xPos, yPos) =>
    rotateClock(
      c,
      curTimer[Math.floor(xPos / 2)][yPos][xPos % 2],
      isMinutesReversed,
    ),
  );

export const resetClock = ({ hours, minutes }: Clock): Clock => ({
  hours: hours % 360,
  minutes: minutes % 360,
  animationTime: 0,
  animationDelay: 0,
});
export const resetTimer = (timer: Timer): Timer =>
  updateClocksProperties(timer, resetClock);

const computeAnimationTypeByPosition = (
  timer: Timer,
  index: number,
  nbTimers: number,
): Timer => {
  if (index === 0) {
    return computeAnimationType(timer, 'start');
  }
  if (index === nbTimers - 1) {
    return computeAnimationType(timer, 'end');
  }
  return timer;
};

const computeTimer = (seq: Sequence, curTimer: Timer) => {
  if (seq.type === 'wait') {
    return computeDelays(curTimer, seq.animationTime, 0);
  }
  const nextTimerState = computeRotation(seq.timer, curTimer, {
    isMinutesReversed: seq.isReverse,
  });
  return computeDelays(nextTimerState, seq.animationTime, seq.delay, seq.ltr);
};

export const computeSequences = (
  sequences: Sequence[],
  lastTimer: Timer,
): Timer[] =>
  sequences
    .reduce(
      (acc: Timer[], seq: Sequence) => [
        ...acc,
        computeTimer(seq, last(acc) || lastTimer),
      ],
      [],
    )
    .map((state: any, index: number, arr: Timer[]) =>
      computeAnimationTypeByPosition(state, index, arr.length),
    );

const getWaitSequence = (timer: Timer): Sequence => ({
  timer,
  type: 'wait',
  animationTime: 3000,
});
export const run = (prevTimer: Timer, { animationTime = 0 }) => {
  const isReverse = getRandomBoolean();
  const sequences = getTimers(isReverse)
    .reduce((acc: Sequence[], timer: Timer, index): Sequence[] => {
      const hasDelay = index === 0 && getRandomBoolean();

      return [
        ...acc,
        {
          timer,
          type: 'shape',
          animationTime,
          delay: index === 0 && getRandomBoolean() ? ANIMATION_DELAY : 0,
          isReverse,
        },
        ...(hasDelay ? [getWaitSequence(timer)] : []),
      ];
    }, [])
    .concat({ timer: getTimeTimer(), type: 'time', animationTime, isReverse });

  return computeSequences(sequences, prevTimer);
};
