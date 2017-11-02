const DEACTIVATE_CLOCKS = { hours: 7.5, minutes: 37.5 };
const VERTICAL_LINE = { hours: 0, minutes: 30 };
const OBLIQUE_LINE = { hours: 1.5, minutes: 37.5 };
const TOP = { hours: 0, minutes: 0 };
const RIGHT = { hours: 3, minutes: 15 };
const BOTTOM = { hours: 6, minutes: 30 };
const LEFT = { hours: 9, minutes: 45 };
const ANGLE_TOP_LEFT = { hours: 0, minutes: 45 };
const ANGLE_TOP_RIGHT = { hours: 3, minutes: 0 };
const ANGLE_BOTTOM_LEFT = { hours: 9, minutes: 30 };
const ANGLE_BOTTOM_RIGHT = { hours: 6, minutes: 15 };

const SHAPES = {
  oblique: { lines: [ // OBLIQUE
    [OBLIQUE_LINE, OBLIQUE_LINE],
    [OBLIQUE_LINE, OBLIQUE_LINE],
    [OBLIQUE_LINE, OBLIQUE_LINE],
  ] },
  square1: { lines: [ // SQUARE 1
    [VERTICAL_LINE, ANGLE_BOTTOM_RIGHT],
    [VERTICAL_LINE, VERTICAL_LINE],
    [VERTICAL_LINE, VERTICAL_LINE],
  ] },
  square2: { lines: [ // SQUARE 2
    [HORIZONTAL_LINE, HORIZONTAL_LINE],
    [ANGLE_BOTTOM_RIGHT, HORIZONTAL_LINE],
    [VERTICAL_LINE, ANGLE_BOTTOM_RIGHT],
  ] },
  square3: { lines: [ // SQUARE 3
    [HORIZONTAL_LINE, HORIZONTAL_LINE],
    [HORIZONTAL_LINE, ANGLE_BOTTOM_LEFT],
    [ANGLE_BOTTOM_LEFT, VERTICAL_LINE],
  ] },
  square4: { lines: [ // SQUARE 4
    [ANGLE_BOTTOM_LEFT, VERTICAL_LINE],
    [VERTICAL_LINE, VERTICAL_LINE],
    [VERTICAL_LINE, VERTICAL_LINE],
  ] },
};

export default SHAPES;
