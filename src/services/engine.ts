import { last } from 'ramda';
import { Timer, Clock, AnimationType, Line, Number } from '../types';
import { getRandomBoolean } from '../utils';

const ANIMATION_DELAY = 300;

export const rotate = (start: number, end: number) =>
  start + (360 - ((start % 360) - end));
export const rotateReverse = (start: number, end: number) =>
  start + (end - (start % 360)) - 360;

const updateClocksProperties = (
  numbers: Timer,
  cb: (
    clock: Clock,
    clockIndex: number,
    clockLinesIndex: number,
    numberIndex: number,
  ) => Clock,
): Timer =>
  numbers.map(
    (number, numberIndex) =>
      number.map(
        (clockLines, clockLinesIndex) =>
          clockLines.map((clock, clockIndex) =>
            cb(clock, clockIndex, clockLinesIndex, numberIndex),
          ) as Line,
      ) as Number,
  ) as Timer;

export const computeDelays = (
  numbers: Timer,
  animationTime: number,
  delay = 0,
) =>
  updateClocksProperties(
    numbers,
    (clock, clockIndex, clockLinesIndex, numberIndex) => {
      const clockDelay = (numberIndex * 2 + clockIndex) * delay;
      return {
        ...clock,
        animationTime: animationTime + numbers.length * delay - clockDelay,
        animationDelay: clockDelay,
      };
    },
  );
const computeAnimationType = (numbers: Timer, animationType: AnimationType) =>
  updateClocksProperties(numbers, (clock) => ({
    ...clock,
    animationType,
  }));
export const computeRotation = (
  numbers: Timer,
  prevNumbers: Timer,
  {
    isMinutesReversed,
  }: {
    isMinutesReversed?: boolean;
  } = {},
) =>
  updateClocksProperties(
    numbers,
    (
      clock: Clock,
      clockIndex: number,
      clockLinesIndex: number,
      numberIndex: number,
    ) => {
      const { hours, minutes } = prevNumbers[numberIndex][clockLinesIndex][
        clockIndex
      ];
      return {
        ...clock,
        hours: rotate(hours, clock.hours),
        minutes: isMinutesReversed
          ? rotateReverse(minutes, clock.minutes)
          : rotate(minutes, clock.minutes),
      };
    },
  );
export const resetClock = ({ hours, minutes }: Clock): Clock => ({
  hours: hours % 360,
  minutes: minutes % 360,
  animationTime: 0,
  animationDelay: 0,
});
export const resetTimer = (numbers: Timer): Timer =>
  updateClocksProperties(numbers, resetClock);

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

/**
 * Apply the sequences values
 */
export function computeSequences(
  timers: Timer[],
  prevTimer: Timer,
  { animationTime = 0 },
) {
  const isReverse = getRandomBoolean();
  const rotationsState = timers.reduce((acc: Timer[], arr: Timer) => [
    ...acc,
    computeRotation(arr, last(acc) || prevTimer, {
      isMinutesReversed: isReverse,
    }),
  ], []);

  return rotationsState.map((state: any, index: number) => {
    const hasDelay = getRandomBoolean();
    const animationDelay = hasDelay && index === 0 ? ANIMATION_DELAY : 0;
    const nextTimerState = computeAnimationTypeByPosition(
      state,
      index,
      rotationsState.length,
    );

    return computeDelays(nextTimerState, animationTime, animationDelay);
  });
}
