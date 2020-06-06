import {
  rotate,
  rotateReverse,
  resetClock,
  rotateClock,
  setClockDelay,
} from './engine';

describe('#rotate()', () => {
  test('should do a rotation', () => {
    expect(rotate(0, 45)).toBe(45 + 360);
    expect(rotate(0, 0)).toBe(360);
    expect(rotate(360, 0)).toBe(360 + 360);
  });
});

describe('#rotateReverse()', () => {
  test('should do a reverse rotation', () => {
    expect(rotateReverse(0, 90)).toBe(-270);
    expect(rotateReverse(0, 0)).toBe(-360);
    expect(rotateReverse(360, 0)).toBe(0);
  });
});

describe('#resetClock()', () => {
  test('should do a rotation', () => {
    const state = { hours: 360, minutes: 90 };
    const newState = {
      hours: 0,
      minutes: 90,
      animationTime: 0,
      animationDelay: 0,
    };
    expect(resetClock(state)).toEqual(newState);
  });
});

describe('#rotateClock()', () => {
  test('should do a rotation', () => {
    const state = { hours: 360, minutes: 90, animationTime: 10 };
    const newState = {
      hours: 720,
      minutes: 450,
      animationTime: 10,
    };
    expect(rotateClock(state, { hours: 0, minutes: 30 })).toEqual(newState);
  });
});

describe('#setClockDelay()', () => {
  test('should do a rotation', () => {
    const state = { hours: 360, minutes: 90 };
    const newState = {
      hours: 360,
      minutes: 90,
      animationTime: 30,
      animationDelay: 30,
    };
    expect(setClockDelay(state, 3, 20, 10)).toEqual(newState);
  });
});
