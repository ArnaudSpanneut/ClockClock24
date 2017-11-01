const DEACTIVATE_CLOCKS = { hours: 7.5, minutes: 37.5 };
const LINE = { hours: 0, minutes: 30 };
const TOP = { hours: 0, minutes: 0 };
const RIGHT = { hours: 3, minutes: 15 };
const BOTTOM = { hours: 6, minutes: 30 };
const LEFT = { hours: 9, minutes: 45 };
const ANGLE_TOP_LEFT = { hours: 0, minutes: 45 };
const ANGLE_TOP_RIGHT = { hours: 3, minutes: 0 };
const ANGLE_BOTTOM_LEFT = { hours: 9, minutes: 30 };
const ANGLE_BOTTOM_RIGHT = { hours: 6, minutes: 15 };
const NUMBERS = [
  { lines: [ // 0
    [ANGLE_BOTTOM_RIGHT, ANGLE_BOTTOM_LEFT],
    [LINE, LINE],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 1
    [DEACTIVATE_CLOCKS, BOTTOM],
    [DEACTIVATE_CLOCKS, LINE],
    [DEACTIVATE_CLOCKS, TOP],
  ] },
  { lines: [ // 2
    [RIGHT, ANGLE_BOTTOM_LEFT],
    [ANGLE_BOTTOM_RIGHT, ANGLE_TOP_LEFT],
    [ANGLE_TOP_RIGHT, LEFT],
  ] },
  { lines: [ // 3
    [RIGHT, ANGLE_BOTTOM_LEFT],
    [RIGHT, ANGLE_TOP_LEFT],
    [RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 4
    [BOTTOM, BOTTOM],
    [ANGLE_TOP_RIGHT, LINE],
    [DEACTIVATE_CLOCKS, TOP],
  ] },
  { lines: [ // 5
    [ANGLE_BOTTOM_RIGHT, LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_BOTTOM_LEFT],
    [RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 6
    [ANGLE_BOTTOM_RIGHT, LEFT],
    [LINE, ANGLE_BOTTOM_LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 7
    [RIGHT, ANGLE_BOTTOM_LEFT],
    [DEACTIVATE_CLOCKS, LINE],
    [DEACTIVATE_CLOCKS, TOP],
  ] },
  { lines: [ // 8
    [ANGLE_BOTTOM_RIGHT, ANGLE_BOTTOM_LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 9
    [ANGLE_BOTTOM_RIGHT, ANGLE_BOTTOM_LEFT],
    [ANGLE_TOP_RIGHT, LINE],
    [RIGHT, ANGLE_TOP_LEFT],
  ] },
]

export default NUMBERS;
