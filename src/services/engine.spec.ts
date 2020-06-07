import { flatten } from 'ramda';
import { simpleTimer } from '../../mocks/timers';

import {
  rotate,
  rotateReverse,
  resetClock,
  rotateClock,
  setClockDelay,
  computeSequences,
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
      hours: 720,
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
    const mockRandom = jest.spyOn(Math, 'random');
    mockRandom.mockImplementation(() => 0);

    const timers = [simpleTimer(), simpleTimer(), simpleTimer()];
    const newState = computeSequences(timers, simpleTimer(), {
      animationTime: 10,
    });

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
  test('should do a rotation', () => {
    const mockRandom = jest.spyOn(Math, 'random');
    mockRandom.mockImplementation(() => 1);

    const timers = [simpleTimer(), simpleTimer()];
    const newState = computeSequences(timers, simpleTimer(), {});

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
  });
});
