import { Clock, Line, Number, Timer } from '../src/types';

const clock = (hours = 0, minutes = 0): Clock => ({ hours, minutes });
const line = (hours?: number, minutes?: number): Line => [
  clock(hours, minutes),
  clock(hours, minutes),
];
const number = (hours?: number, minutes?: number): Number => [
  line(hours, minutes),
  line(hours, minutes),
  line(hours, minutes),
];

export const simpleTimer = (): Timer => [
  number(),
  number(),
  number(),
  number(),
];
