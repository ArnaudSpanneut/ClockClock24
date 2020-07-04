import { pipe, flatten, propOr, descend, sort, head } from 'ramda';
import { Timer, Clock } from './types';

const noop = () => {};
const requestTimeout = (
  fn: Function,
  delay: number,
  registerCancel: (cb: () => void) => void,
) => {
  const start = new Date().getTime();

  const loop = () => {
    const delta = new Date().getTime() - start;

    if (delta >= delay) {
      fn();
      registerCancel(noop);
      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
};

export type Timeout = {
  promise: Promise<unknown>;
  cancel: () => void;
};
export const startimeout = (time: number): Timeout => {
  let cancel = () => {};
  const promise = new Promise((resolve, reject) => {
    let timeoutCancel = () => {};
    requestTimeout(resolve, time, (fn) => {
      timeoutCancel = fn;
    });
    cancel = () => {
      timeoutCancel();
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
