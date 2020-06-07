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
    animationTime: animationTime + 4 * delay - animationDelay,
  };
};
const computeDelays = (timer: Timer, animationTime: number, delay?: number) =>
  updateClocksProperties(timer, (c, xPos) =>
    setClockDelay(c, xPos, animationTime, delay),
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
  prevTimer: Timer,
  {
    isMinutesReversed = false,
  } = {},
) =>
  updateClocksProperties(timer, (c, xPos, yPos) =>
    rotateClock(
      c,
      prevTimer[Math.floor(xPos / 2)][yPos][xPos % 2],
      isMinutesReversed,
    ),
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
  const hasStartDelay = getRandomBoolean();

  const rotationsState = timers.reduce(
    (acc: Timer[], arr: Timer) => [
      ...acc,
      computeRotation(arr, last(acc) || prevTimer, {
        isMinutesReversed: isReverse,
      }),
    ],
    [],
  );

  return rotationsState.map((state: any, index: number) => {
    const animationDelay = hasStartDelay && index === 0 ? ANIMATION_DELAY : 0;
    const nextTimerState = computeAnimationTypeByPosition(
      state,
      index,
      rotationsState.length,
    );

    return computeDelays(nextTimerState, animationTime, animationDelay);
  });
}
