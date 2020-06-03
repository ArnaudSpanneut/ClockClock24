const ANIMATION_DELAY = 300;

const calculRotation = (start, end) => start + (360 - ((start % 360) - end));
const calculReverseRotation = (start, end) => (
  start + ((end - (start + 360)) % 360) - 360
);

const updateClocksProperties = (numbers, cb) =>
  numbers.map((number, numberIndex) =>
    number.map((clockLines, clockLinesIndex) =>
      clockLines.map((clock, clockIndex) =>
        cb(clock, clockIndex, clockLinesIndex, numberIndex))));
const computeDelays = (numbers, animationTime, delay = 0) =>
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
const computeAnimationType = (numbers, animationType) =>
  updateClocksProperties(numbers, (clock) => ({
    ...clock,
    animationType,
  }));
const computeRotation = (numbers, prevNumbers, options = {}) => {
  const { isMinutesReversed } = options;
  return updateClocksProperties(
    numbers,
    (clock, clockIndex, clockLinesIndex, numberIndex) => {
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
export const computeClearRotations = (numbers) =>
  updateClocksProperties(numbers, (clock) => ({
    hours: clock.hours % 360,
    minutes: clock.minutes % 360,
    animationTime: 0,
    animationDelay: 0,
  }));
const computeAnimationTypeByPosition = (state, index, nbState) => {
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
 * @param {Array} sequences Numbers
 * @param {Array} prevNumbers The last number displayed
 * @param {Object} options Clock options
 * @param {Number} options.animationTime Time for the animation
 * @param {Boolean} options.isReverse Reverse the rotation of the needles
 * @return {Array} New sequences states
 */
export function computeSequences(sequences, prevNumbers, options = {}) {
  const { animationTime, isReverse } = options;
  const rotationsState = sequences.reduce((acc, arr, index) => {
    const prev = acc[index - 1] || prevNumbers;
    const rotationOptions = {
      isMinutesReversed: isReverse,
    };

    return acc.concat([computeRotation(arr, prev, rotationOptions)]);
  }, []);

  return rotationsState.map((state, index) => {
    const animationDelay = index === 0 ? ANIMATION_DELAY : 0;
    const nextState = computeAnimationTypeByPosition(
      state,
      index,
      rotationsState.length,
    );

    return computeDelays(nextState, animationTime, animationDelay);
  });
}
