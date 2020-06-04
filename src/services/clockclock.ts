import { Timer, Clock, AnimationType, Line, Number } from '../types';

const ANIMATION_DELAY = 300;

const calculRotation = (start: number, end: number) =>
  start + (360 - ((start % 360) - end));
const calculReverseRotation = (start: number, end: number) =>
  start + ((end - (start + 360)) % 360) - 360;

const updateClocksProperties = (
  numbers: Timer,
  cb: (
    clock: Clock,
    clockIndex: number,
    clockLinesIndex: number,
    numberIndex: number,
  ) => Clock,
): Timer =>
  numbers.map((number, numberIndex) =>
    number.map((clockLines, clockLinesIndex) =>
      clockLines.map((clock, clockIndex) =>
        cb(clock, clockIndex, clockLinesIndex, numberIndex),
      ) as Line,
    ) as Number,
  ) as Timer;

const computeDelays = (numbers: Timer, animationTime: number, delay = 0) =>
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
const computeRotation = (
  numbers: Timer,
  prevNumbers: Timer,
  options: {
    isMinutesReversed?: boolean;
  } = {},
) => {
  const { isMinutesReversed } = options;
  return updateClocksProperties(
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
        hours: calculRotation(hours, clock.hours),
        minutes: isMinutesReversed
          ? calculReverseRotation(minutes, clock.minutes)
          : calculRotation(minutes, clock.minutes),
      };
    },
  );
};
export const computeClearRotations = (numbers: Timer) =>
  updateClocksProperties(numbers, (clock) => ({
    hours: clock.hours % 360,
    minutes: clock.minutes % 360,
    animationTime: 0,
    animationDelay: 0,
  }));
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
  { animationTime, isReverse }: {
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
