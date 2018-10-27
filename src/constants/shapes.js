import utils from './utils';

const ALL_OBLIQUES = [ // OBLIQUE
  [utils.OBLIQUE_LINE, utils.OBLIQUE_LINE],
  [utils.OBLIQUE_LINE, utils.OBLIQUE_LINE],
  [utils.OBLIQUE_LINE, utils.OBLIQUE_LINE],
];

const SHAPES = {
  oblique: [
    { lines: ALL_OBLIQUES },
    { lines: ALL_OBLIQUES },
    { lines: ALL_OBLIQUES },
    { lines: ALL_OBLIQUES },
  ],
  square: [
    {
      lines: [
        [utils.VERTICAL_LINE, utils.ANGLE_BOTTOM_RIGHT],
        [utils.VERTICAL_LINE, utils.VERTICAL_LINE],
        [utils.VERTICAL_LINE, utils.VERTICAL_LINE],
      ],
    }, {
      lines: [
        [utils.HORIZONTAL_LINE, utils.HORIZONTAL_LINE],
        [utils.ANGLE_BOTTOM_RIGHT, utils.HORIZONTAL_LINE],
        [utils.VERTICAL_LINE, utils.ANGLE_BOTTOM_RIGHT],
      ],
    }, {
      lines: [
        [utils.HORIZONTAL_LINE, utils.HORIZONTAL_LINE],
        [utils.HORIZONTAL_LINE, utils.ANGLE_BOTTOM_LEFT],
        [utils.ANGLE_BOTTOM_LEFT, utils.VERTICAL_LINE],
      ],
    }, {
      lines: [
        [utils.ANGLE_BOTTOM_LEFT, utils.VERTICAL_LINE],
        [utils.VERTICAL_LINE, utils.VERTICAL_LINE],
        [utils.VERTICAL_LINE, utils.VERTICAL_LINE],
      ],
    },
  ],
  lol: [
    {
      lines: [
        [utils.VERTICAL_LINE, utils.BOTTOM],
        [utils.VERTICAL_LINE, utils.VERTICAL_LINE],
        [utils.VERTICAL_LINE, utils.ANGLE_TOP_RIGHT],
      ],
    }, {
      lines: [
        [utils.DEACTIVATE_CLOCKS, utils.ANGLE_BOTTOM_RIGHT],
        [utils.DEACTIVATE_CLOCKS, utils.VERTICAL_LINE],
        [utils.LEFT, utils.ANGLE_TOP_RIGHT],
      ],
    }, {
      lines: [
        [utils.ANGLE_BOTTOM_LEFT, utils.BOTTOM],
        [utils.VERTICAL_LINE, utils.VERTICAL_LINE],
        [utils.ANGLE_TOP_LEFT, utils.ANGLE_TOP_RIGHT],
      ],
    }, {
      lines: [
        [utils.DEACTIVATE_CLOCKS, utils.VERTICAL_LINE],
        [utils.DEACTIVATE_CLOCKS, utils.VERTICAL_LINE],
        [utils.LEFT, utils.VERTICAL_LINE],
      ],
    },
  ],
};

export default SHAPES;
