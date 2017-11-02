const DEACTIVATE_CLOCKS = { hours: 7.5, minutes: 37.5 };
const VERTICAL_LINE = { hours: 0, minutes: 30 };
const HORIZONTAL_LINE = { hours: 3, minutes: 45 };
const OBLIQUE_LINE = { hours: 1.5, minutes: 37.5 };
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
    [VERTICAL_LINE, VERTICAL_LINE],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 1
    [DEACTIVATE_CLOCKS, BOTTOM],
    [DEACTIVATE_CLOCKS, VERTICAL_LINE],
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
    [ANGLE_TOP_RIGHT, VERTICAL_LINE],
    [DEACTIVATE_CLOCKS, TOP],
  ] },
  { lines: [ // 5
    [ANGLE_BOTTOM_RIGHT, LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_BOTTOM_LEFT],
    [RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 6
    [ANGLE_BOTTOM_RIGHT, LEFT],
    [VERTICAL_LINE, ANGLE_BOTTOM_LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 7
    [RIGHT, ANGLE_BOTTOM_LEFT],
    [DEACTIVATE_CLOCKS, VERTICAL_LINE],
    [DEACTIVATE_CLOCKS, TOP],
  ] },
  { lines: [ // 8
    [ANGLE_BOTTOM_RIGHT, ANGLE_BOTTOM_LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
    [ANGLE_TOP_RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // 9
    [ANGLE_BOTTOM_RIGHT, ANGLE_BOTTOM_LEFT],
    [ANGLE_TOP_RIGHT, VERTICAL_LINE],
    [RIGHT, ANGLE_TOP_LEFT],
  ] },
  { lines: [ // OBLIQUE
    [OBLIQUE_LINE, OBLIQUE_LINE],
    [OBLIQUE_LINE, OBLIQUE_LINE],
    [OBLIQUE_LINE, OBLIQUE_LINE],
  ] },
  { lines: [ // SQUARE 1
    [VERTICAL_LINE, ANGLE_BOTTOM_RIGHT],
    [VERTICAL_LINE, VERTICAL_LINE],
    [VERTICAL_LINE, VERTICAL_LINE],
  ] },
  { lines: [ // SQUARE 2
    [HORIZONTAL_LINE, HORIZONTAL_LINE],
    [ANGLE_BOTTOM_RIGHT, HORIZONTAL_LINE],
    [VERTICAL_LINE, ANGLE_BOTTOM_RIGHT],
  ] },
  { lines: [ // SQUARE 3
    [HORIZONTAL_LINE, HORIZONTAL_LINE],
    [HORIZONTAL_LINE, ANGLE_BOTTOM_LEFT],
    [ANGLE_BOTTOM_LEFT, VERTICAL_LINE],
  ] },
  { lines: [ // SQUARE 4
    [ANGLE_BOTTOM_LEFT, VERTICAL_LINE],
    [VERTICAL_LINE, VERTICAL_LINE],
    [VERTICAL_LINE, VERTICAL_LINE],
  ] },
  { lines: [ // LOL 1
    [VERTICAL_LINE, BOTTOM],
    [VERTICAL_LINE, VERTICAL_LINE],
    [VERTICAL_LINE, ANGLE_TOP_RIGHT],
  ] },
  { lines: [ // LOL 2
    [DEACTIVATE_CLOCKS, ANGLE_BOTTOM_RIGHT],
    [DEACTIVATE_CLOCKS, VERTICAL_LINE],
    [LEFT, ANGLE_TOP_RIGHT],
  ] },
  { lines: [ // LOL 3
    [ANGLE_BOTTOM_LEFT, BOTTOM],
    [VERTICAL_LINE, VERTICAL_LINE],
    [ANGLE_TOP_LEFT, ANGLE_TOP_RIGHT],
  ] },
  { lines: [ // LOL 4
    [DEACTIVATE_CLOCKS, VERTICAL_LINE],
    [DEACTIVATE_CLOCKS, VERTICAL_LINE],
    [LEFT, VERTICAL_LINE],
  ] },
]

export default NUMBERS;
