
export type Rotation = number;
export type Clock = {
  hours: Rotation;
  minutes: Rotation;
  animationTime?: number;
  animationDelay?: number;
  animationType?: AnimationType;
};
export type Line = [Clock, Clock];
export type Number = [Line, Line, Line];
export type Timer = [Number, Number, Number, Number];

export type AnimationType = 'start' | 'end';