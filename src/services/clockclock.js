
const ANIMATION_DELAY = 300;

const calculRotation = (start, end) => start + (360 - ((start % 360) - end));
const calculReverseRotation = (start, end) => start + ((end - (start + 360)) % 360) - 360;

const updateClocksProperties = (numbers, cb) => numbers
  .map((number, numberIndex) => number
    .map((clockLines, clockLinesIndex) => clockLines
      .map((clock, clockIndex) => cb(clock, clockIndex, clockLinesIndex, numberIndex))));
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
const computeAnimationType = (numbers, animationType) => (
  updateClocksProperties(numbers, clock => ({
    ...clock,
    animationType,
  }))
);
const computeRotation = (numbers, prevNumbers) => (
  updateClocksProperties(numbers, (clock, clockIndex, clockLinesIndex, numberIndex) => {
    const { hours, minutes } = prevNumbers[numberIndex][clockLinesIndex][clockIndex];
    return {
      ...clock,
      hours: calculRotation(hours, clock.hours),
      minutes: calculReverseRotation(minutes, clock.minutes),
    };
  })
);

/**
 * Apply the sequences values
 * @param {Array} sequences Numbers
 * @param {Array} prevNumbers The last number displayed
 * @param {Number} animationTime Time for the animation
 * @return {Array} New sequences states
 */
export default function computeSequences(sequences, prevNumbers, animationTime) {
  const rotationsState = sequences
    .reduce((acc, arr, index) => {
      const prev = acc[index - 1] || prevNumbers;

      return acc.concat([computeRotation(arr, prev)]);
    }, []);

  return rotationsState
    .map((state, index) => {
      const isFirst = (index === 0);
      const isLast = (index === rotationsState.length - 1);
      const animationDelay = (isFirst) ? ANIMATION_DELAY : 0;
      let nextState = null;

      if (isFirst) {
        nextState = computeAnimationType(state, 'start');
      } else if (isLast) {
        nextState = computeAnimationType(state, 'end');
      } else {
        nextState = state;
      }

      return computeDelays(nextState, animationTime, animationDelay);
    });
}
