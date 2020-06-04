import { Timer, Clock } from './types';

export const startimeout = (
  time: number,
): {
  promise: Promise<unknown>;
  cancel: () => void;
} => {
  let cancel = () => {};
  const promise = new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, time);
    cancel = () => {
      clearTimeout(timeout);
      reject();
    };
  });

  return { promise, cancel };
};
export const runSequences = (arr: any[]): Promise<unknown> =>
  arr.reduce((promise, func) => promise.then(func), Promise.resolve());

export const getArrTime = (): number[] => {
  const time = new Date(Date.now());
  const timeToString = time.toTimeString().replace(':', '').slice(0, 4);

  return timeToString.split('').map((s) => parseInt(s, 10));
};
export const getClockSize = (
  clockSize: number,
  clockPadding: number,
): {
  height: number;
  width: number;
} => {
  const totalClockSize = clockSize + clockPadding * 2;
  const NB_LINES = 3;
  const NB_COLUMNS = 8;
  const height = totalClockSize * NB_LINES;
  const width = totalClockSize * NB_COLUMNS;

  return {
    height,
    width,
  };
};
export const flatArr = (arr: any[][]): any[] =>
  arr.reduce(
    (acc, entry) => acc.concat(Array.isArray(entry) ? flatArr(entry) : entry),
    [],
  );
export const findClock = (
  numbers: Timer,
  conditionFunc: (a: Clock, b: Clock) => boolean,
) => flatArr(numbers).sort((a, b) => (conditionFunc(a, b) ? 1 : -1))[0];

export const getLastArrItem = <T>(arr: T[]): T => arr[arr.length - 1];

export const getRandomNumber = (max: number, min = 1): number =>
  Math.floor(Math.random() * (max + min));
