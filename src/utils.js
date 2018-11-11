export function startimeout(time) {
  return new Promise(resolve => setTimeout(() => {
    resolve();
  }, time));
}
export function runSequences(arr) {
  return arr
    .reduce((promise, func) => promise
      .then(func),
    Promise.resolve());
}
export function getArrTime() {
  const time = new Date(Date.now());
  const timeToString = time.toTimeString()
    .slice(0, 5)
    .replace(':', '');

  return timeToString.split('');
}
export function getClockSize(clockSize, clockPadding) {
  const totalClockSize = clockSize + (clockPadding * 2);
  const NB_LINES = 3;
  const NB_COLUMNS = 8;
  const height = (totalClockSize * NB_LINES);
  const width = (totalClockSize * NB_COLUMNS);

  return {
    height,
    width,
  };
}
export const updateClocksProperties = (numbers, cb) => numbers
  .map((number, numberIndex) => number
    .map((clockLines, clockLinesIndex) => clockLines
      .map((clock, clockIndex) => cb(clock, clockIndex, clockLinesIndex, numberIndex))));
export const flatArr = arr => arr
  .reduce((acc, entry) => acc.concat((Array.isArray(entry))
    ? flatArr(entry)
    : entry), []);
export const findClock = (numbers, conditionFunc) => flatArr(numbers)
  .sort((a, b) => (conditionFunc(a, b) ? 1 : -1))[0];
