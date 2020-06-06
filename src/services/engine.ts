import { Timer, Clock, AnimationType, Line, Number } from '../types';

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
  state: any,
  index: number,
  nbState: number,
) => {
  if (index === 0) {
    return computeAnimationType(state, 'start');
  }
  if (index === nbState - 1) {
    return computeAnimationType(state, 'end');
  }
  return state;
};

/**
 * Apply the sequences values
 */
export function computeSequences(
  sequences: Timer[],
  prevNumbers: Timer,
  {
    animationTime,
    isReverse,
  }: {
    animationTime: number;
    isReverse?: boolean;
  } = { animationTime: 0 },
) {
  const rotationsState = sequences.reduce(
    (acc: Timer[], arr: Timer, index: number) => {
      const prev = acc[index - 1] || prevNumbers;
      const rotationOptions = {
        isMinutesReversed: isReverse,
      };

      return acc.concat([computeRotation(arr, prev, rotationOptions)]);
    },
    [],
  );

  return rotationsState.map((state: any, index: number) => {
    const animationDelay = index === 0 ? ANIMATION_DELAY : 0;
    const nextState = computeAnimationTypeByPosition(
      state,
      index,
      rotationsState.length,
    );

    return computeDelays(nextState, animationTime, animationDelay);
  });
}
