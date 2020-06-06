import { pipe, flatten, propOr, descend, sort, head } from 'ramda';
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

const getAnimTime = (c: Clock): number => propOr(0, 'animationTime')(c);
const byAnimationTime = descend(getAnimTime);

export const getMaxAnimationTime = (timer: Timer) =>
  pipe(
    // @ts-ignore
    flatten,
    sort(byAnimationTime),
    head,
    getAnimTime,
    // @ts-ignore
  )(timer);

export const getRandomNumber = (max: number, min = 1): number =>
  Math.floor(Math.random() * (max + min));

export const getRandomBoolean = (): boolean =>
  Boolean(Math.round(Math.random()));
