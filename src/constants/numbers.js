import utils from './utils';

const NUMBERS = [
  [ // 0
    [utils.ANGLE_BOTTOM_RIGHT, utils.ANGLE_BOTTOM_LEFT],
    [utils.VERTICAL_LINE, utils.VERTICAL_LINE],
    [utils.ANGLE_TOP_RIGHT, utils.ANGLE_TOP_LEFT],
  ],
  [ // 1
    [utils.DEACTIVATE_CLOCKS, utils.BOTTOM],
    [utils.DEACTIVATE_CLOCKS, utils.VERTICAL_LINE],
    [utils.DEACTIVATE_CLOCKS, utils.TOP],
  ],
  [ // 2
    [utils.RIGHT, utils.ANGLE_BOTTOM_LEFT],
    [utils.ANGLE_BOTTOM_RIGHT, utils.ANGLE_TOP_LEFT],
    [utils.ANGLE_TOP_RIGHT, utils.LEFT],
  ],
  [ // 3
    [utils.RIGHT, utils.ANGLE_BOTTOM_LEFT],
    [utils.RIGHT, utils.ANGLE_TOP_LEFT],
    [utils.RIGHT, utils.ANGLE_TOP_LEFT],
  ],
  [ // 4
    [utils.BOTTOM, utils.BOTTOM],
    [utils.ANGLE_TOP_RIGHT, utils.VERTICAL_LINE],
    [utils.DEACTIVATE_CLOCKS, utils.TOP],
  ],
  [ // 5
    [utils.ANGLE_BOTTOM_RIGHT, utils.LEFT],
    [utils.ANGLE_TOP_RIGHT, utils.ANGLE_BOTTOM_LEFT],
    [utils.RIGHT, utils.ANGLE_TOP_LEFT],
  ],
  [ // 6
    [utils.ANGLE_BOTTOM_RIGHT, utils.LEFT],
    [utils.VERTICAL_LINE, utils.ANGLE_BOTTOM_LEFT],
    [utils.ANGLE_TOP_RIGHT, utils.ANGLE_TOP_LEFT],
  ],
  [ // 7
    [utils.RIGHT, utils.ANGLE_BOTTOM_LEFT],
    [utils.DEACTIVATE_CLOCKS, utils.VERTICAL_LINE],
    [utils.DEACTIVATE_CLOCKS, utils.TOP],
  ],
  [ // 8
    [utils.ANGLE_BOTTOM_RIGHT, utils.ANGLE_BOTTOM_LEFT],
    [utils.ANGLE_TOP_RIGHT, utils.ANGLE_TOP_LEFT],
    [utils.ANGLE_TOP_RIGHT, utils.ANGLE_TOP_LEFT],
  ],
  [ // 9
    [utils.ANGLE_BOTTOM_RIGHT, utils.ANGLE_BOTTOM_LEFT],
    [utils.ANGLE_TOP_RIGHT, utils.VERTICAL_LINE],
    [utils.RIGHT, utils.ANGLE_TOP_LEFT],
  ],
];

export default NUMBERS;
