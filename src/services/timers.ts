import { Timer } from '../types';

import NUMBERS from '../constants/numbers';
import SHAPES, { ShapeType } from '../constants/shapes';
import { getRandomNumber, getRandomBoolean } from '../utils';

const getArrTime = (): number[] => {
  const time = new Date(Date.now());
  const timeToString = time.toTimeString().replace(':', '').slice(0, 4);

  return timeToString.split('').map((s) => parseInt(s, 10));
};

/**
 * Get a random set of configuration to display forms
 * @return Clocks config
 */
const getRandowShapedTimer = (type: ShapeType): Timer => {
  const shapes = SHAPES[type];
  const randomIndex = getRandomNumber(shapes.length - 1);
  return shapes[randomIndex];
};

const getRandowShapeType = (): ShapeType => {
  const shapesTypes = Object.keys(SHAPES) as ShapeType[];
  const randomIndex = getRandomNumber(shapesTypes.length - 1);
  return shapesTypes[randomIndex];
};
const getSameShape = (nb: number, shapeType: ShapeType): Timer[] => {
  const shape = getRandowShapedTimer(shapeType);

  return Array(nb).fill(shape);
};
const getDifferentShape = (nb: number, shapeType: ShapeType): Timer[] =>
  Array(nb)
    .fill(null)
    .map(() => getRandowShapedTimer(shapeType));

/**
 * Get the current time in a timer type
 */
export const getTimeTimer = (): any => getArrTime().map((nb) => NUMBERS[nb]);

export const getTimers = (nb = 2): Timer[] => {
  const isSame = getRandomBoolean();
  const shapeType = getRandowShapeType();

  return isSame ? getSameShape(nb, shapeType) : getDifferentShape(nb, shapeType);
};
