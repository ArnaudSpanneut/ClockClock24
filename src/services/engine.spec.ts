import { getTimers, getTimeTimer } from './timers';
import { getRandomBoolean } from '../utils';
import { flatten } from 'ramda';
import { simpleTimer } from '../../mocks/timers';

jest.mock('./timers');
jest.mock('../utils');

import {
  Sequence,
  rotate,
  rotateReverse,
  resetClock,
  rotateClock,
  setClockDelay,
  computeSequences,
  run,
} from './engine';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('#rotate()', () => {
  test('should do a rotation', () => {
    expect(rotate(0, 45)).toBe(45 + 360);
    expect(rotate(0, 0)).toBe(360);
    expect(rotate(360, 0)).toBe(720);
    expect(rotate(270, 90)).toBe(360 + 90);
    expect(rotate(540, 180)).toBe(720 + 180);
    expect(rotate(0, 360)).toBe(360);
    expect(rotate(360, 180)).toBe(540);
    expect(rotate(-45, 180)).toBe(180);
    expect(rotate(-360, 180)).toBe(-180);
  });
});
describe('#rotateReverse()', () => {
  test('should do a reverse rotation', () => {
    expect(rotateReverse(-180, 180)).toBe(-540);
    expect(rotateReverse(-45, 135)).toBe(-225);
    expect(rotateReverse(-135, 225)).toBe(-495);
    expect(rotateReverse(135, 90)).toBe(-270);
    expect(rotateReverse(360, 360)).toBe(0);
    expect(rotateReverse(0, 360)).toBe(-360);
    expect(rotateReverse(270, 90)).toBe(90);
    expect(rotateReverse(360, 180)).toBe(180);
    expect(rotateReverse(-360, 0)).toBe(-720);
  });
});

describe('#resetClock()', () => {
  test('should clean clocks state', () => {
    const state = { hours: 360, minutes: 90 };
    const newState = resetClock(state);
    expect(newState).toEqual({
      hours: 0,
      minutes: 90,
      animationTime: 0,
      animationDelay: 0,
    });
  });
});

describe('#rotateClock()', () => {
  test('should set the rotations', () => {
    const state = { hours: 360, minutes: 90, animationTime: 10 };
    const newState = rotateClock(state, { hours: 0, minutes: 30 });
    expect(newState).toEqual({
      hours: 360,
      minutes: 450,
      animationTime: 10,
    });
  });
});

describe('#setClockDelay()', () => {
  test('should set timing with delay', () => {
    const state = { hours: 360, minutes: 90 };
    const newState = setClockDelay(state, 3, 20, 10);
    expect(newState).toEqual({
      hours: 360,
      minutes: 90,
      animationTime: 30,
      animationDelay: 30,
    });
  });
  test('should set timing without delay', () => {
    const state = { hours: 360, minutes: 90 };
    const newState = setClockDelay(state, 3, 20);
    expect(newState).toEqual({
      hours: 360,
      minutes: 90,
      animationTime: 20,
      animationDelay: 0,
    });
  });
});

describe('#computeSequences()', () => {
  test('should compute sequences', () => {
    // const { computeSequences } = jest.requireActual('./engine');

    const sequences = [
      { timer: simpleTimer(), type: 'shape', animationTime: 10 },
      { timer: simpleTimer(), type: 'shape', animationTime: 10 },
      { timer: simpleTimer(), type: 'shape', animationTime: 10 },
    ] as Sequence[];
    const newState = computeSequences(sequences, simpleTimer());

    flatten<any>(newState[0]).forEach((clock) => {
      expect(clock).toEqual({
        animationDelay: 0,
        animationTime: 10,
        animationType: 'start',
        hours: 360,
        minutes: 360,
      });
    });
    flatten<any>(newState[1]).forEach((clock) => {
      expect(clock).toEqual({
        animationDelay: 0,
        animationTime: 10,
        hours: 720,
        minutes: 720,
      });
    });
    flatten<any>(newState[2]).forEach((clock) => {
      expect(clock).toEqual({
        animationDelay: 0,
        animationTime: 10,
        animationType: 'end',
        hours: 1080,
        minutes: 1080,
      });
    });
  });
});

describe('#run()', () => {
  test('should generate timers', () => {
    (getTimers as jest.Mock).mockReturnValue([simpleTimer(), simpleTimer()]);
    (getTimeTimer as jest.Mock).mockReturnValue(simpleTimer());
    (getRandomBoolean as jest.Mock).mockReturnValue(true);

    const newState = run(simpleTimer(), {});

    expect(getTimers).toHaveBeenCalled();
    expect(getTimeTimer).toHaveBeenCalled();

    expect(newState[0][0][0][0]).toEqual({
      animationDelay: 0,
      animationTime: 1200,
      animationType: 'start',
      hours: 360,
      minutes: -360,
    });
    expect(newState[0][0][0][1]).toEqual({
      animationDelay: 300,
      animationTime: 900,
      animationType: 'start',
      hours: 360,
      minutes: -360,
    });
    expect(newState[1][0][0][0]).toEqual({
      animationDelay: 0,
      animationTime: 3000,
      hours: 360,
      minutes: -360,
    });
    expect(newState[2][0][0][0]).toEqual({
      animationDelay: 0,
      animationTime: 0,
      hours: 720,
      minutes: -720,
    });
  });
  test('should generate timers', () => {
    (getTimers as jest.Mock).mockReturnValue([simpleTimer()]);
    (getTimeTimer as jest.Mock).mockReturnValue(simpleTimer());
    (getRandomBoolean as jest.Mock).mockReturnValue(false);

    const newState = run(simpleTimer(), {});

    expect(getTimers).toHaveBeenCalled();
    expect(getTimeTimer).toHaveBeenCalled();

    expect(newState[0][0][0][0]).toEqual({
      animationDelay: 0,
      animationTime: 0,
      animationType: 'start',
      hours: 360,
      minutes: 360,
    });
    expect(newState[0][0][0][1]).toEqual({
      animationDelay: 0,
      animationTime: 0,
      animationType: 'start',
      hours: 360,
      minutes: 360,
    });
  });
});
