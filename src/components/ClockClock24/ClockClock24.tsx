import {last} from 'ramda';
import React, { Component } from 'react';

import { Timer } from '../../types';

import './clockClock24.css';

import NUMBERS from '../../constants/numbers';
import SHAPES, { ShapeType } from '../../constants/shapes';

import {
  startimeout,
  runSequences,
  getArrTime,
  getClockSize,
  getMaxAnimationTime,
  getRandomNumber,
} from '../../utils';
import {
  computeSequences,
  computeClearRotations,
} from '../../services/clockclock';

import Number from './Number';
import ButtonTest from './ButtonTest';

const ONE_MILLI = 1000;
const ONE_MINUTES_IN_MILLI = 60000;

/**
 * Get the clocks config depends of the number
 * @return Clocks config
 */
const getTimeValues = (): any => getArrTime().map((nb) => NUMBERS[nb]);
/**
 * Get a random set of configuration to display forms
 * @return Clocks config
 */
const getRandowShape = (type: ShapeType) => {
  const shapes = SHAPES[type];
  const randomIndex = getRandomNumber(shapes.length - 1);
  return shapes[randomIndex];
};
const getRandowShapeType = (): ShapeType => {
  const shapesTypes = Object.keys(SHAPES) as ShapeType[];
  const randomIndex = getRandomNumber(shapesTypes.length - 1);
  return shapesTypes[randomIndex];
};
/**
 * Get the remaining time before the time change
 * @return {Number} Remaining time
 */
const getRemainingTime = (): number => {
  const secondsInMilli = new Date().getSeconds() * ONE_MILLI;
  return ONE_MINUTES_IN_MILLI - secondsInMilli;
};
/**
 * Waiting for the next minute
 * @return Remaining time
 */
const nextTime = () => startimeout(getRemainingTime());

const getReverseShape = (shapeType: ShapeType): Timer[] => {
  const shape = getRandowShape(shapeType);

  return [shape, shape];
};
const getOtherShape = (shapeType: ShapeType) => [
  getRandowShape(shapeType),
  getRandowShape(shapeType),
];
/**
 * Play a set of animations for clocks
 */
const startDancing = (
  animationTime: number,
  prevNumbers: Timer,
  onChange: ({ numbers }: { numbers: Timer }) => void,
): {
  promise: Promise<Timer>;
  cancel: () => void;
} => {
  const shapeType = getRandowShapeType();
  const isReverse = shapeType === 'SYMMETRICAL';
  const timers = [
    ...(isReverse ? getReverseShape(shapeType) : getOtherShape(shapeType)),
    getTimeValues(),
  ];

  let timeout: any = null;

  const setStateTimeout = async (numbers: Timer) => {
    const maxAnimationTime = getMaxAnimationTime(numbers) || animationTime;
    timeout = startimeout(maxAnimationTime);

    onChange({ numbers });
    await timeout.promise;

    return numbers;
  };

  // Sequence of animations
  const sequenceOptions = { animationTime, isReverse };
  const sequences = computeSequences(timers, prevNumbers, sequenceOptions);
  const sequencesPromise = sequences.map((numbers: Timer) => () =>
    setStateTimeout(numbers),
  );

  const promise = runSequences(sequencesPromise)
    .then(() => {
      const lastNumbers = last(sequences);
      if(!lastNumbers) {
        return false;
      }

      const cleanNumbers = computeClearRotations(lastNumbers);
      onChange({ numbers: cleanNumbers });

      timeout = nextTime();
      return timeout.promise.then(() => cleanNumbers);
    })
    .then((lastNumbers) => {
      timeout = startDancing(animationTime, lastNumbers, onChange);
      return timeout.promise;
    });

  return {
    promise,
    cancel: () => {
      if (timeout) {
        timeout.cancel();
      }
    },
  };
};

type ClockClock24Props = {
  animationTime: number;
  clockSize: number;
  clockPadding: number;
};

export default class ClockClock24 extends Component<
  ClockClock24Props,
  { numbers: Timer }
> {
  timeout?: any;

  constructor(props: ClockClock24Props) {
    super(props);

    this.state = {
      numbers: getTimeValues(),
    };
  }

  componentDidMount() {
    const { animationTime } = this.props;
    const { numbers } = this.state;

    this.timeout = nextTime();

    return this.timeout.promise.then(() =>
      startDancing(animationTime, numbers, (state) => this.setState(state)),
    );
  }

  componentWillUnmount() {
    this.cancelTimeout();
  }

  cancelTimeout() {
    if (this.timeout) {
      this.timeout.cancel();
    }
  }

  render() {
    const { numbers } = this.state;
    const { clockSize, clockPadding, animationTime } = this.props;
    const { height, width } = getClockSize(clockSize, clockPadding);
    const clockStyle = {
      height,
      width,
    };

    const onTestClick = () => {
      this.cancelTimeout();
      this.timeout = startDancing(animationTime, numbers, (state) =>
        this.setState(state),
      );
      return true;
    };

    return (
      <div className="clockclock24_container">
        {<ButtonTest onClick={onTestClick} />}
        <div className="clockclock24" style={clockStyle}>
          {numbers.map((number, index) => (
            <Number
              key={index}
              numberLines={number}
              options={{ clockSize, defaultAnimationTime: animationTime }}
            />
          ))}
        </div>
      </div>
    );
  }
}
