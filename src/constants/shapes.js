import utils from './utils';

const ALL_OBLIQUES = [
  // OBLIQUE
  [utils.OBLIQUE_LINE, utils.OBLIQUE_LINE],
  [utils.OBLIQUE_LINE, utils.OBLIQUE_LINE],
  [utils.OBLIQUE_LINE, utils.OBLIQUE_LINE],
];
const ALL_DEACTIVATE = [
  [utils.DEACTIVATE_BOTTOM_LEFT, utils.DEACTIVATE_BOTTOM_LEFT],
  [utils.DEACTIVATE_BOTTOM_LEFT, utils.DEACTIVATE_BOTTOM_LEFT],
  [utils.DEACTIVATE_BOTTOM_LEFT, utils.DEACTIVATE_BOTTOM_LEFT],
];
const OBLIQUES = [ALL_OBLIQUES, ALL_OBLIQUES, ALL_OBLIQUES, ALL_OBLIQUES];
const DEACTIVATE = [
  ALL_DEACTIVATE,
  ALL_DEACTIVATE,
  ALL_DEACTIVATE,
  ALL_DEACTIVATE,
];
const WIND = [
  [
    [
      { hours: 95, minutes: 95 },
      { hours: 100, minutes: 100 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 85, minutes: 85 },
      { hours: 80, minutes: 80 },
    ],
  ],
  [
    [
      { hours: 110, minutes: 110 },
      { hours: 150, minutes: 150 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 70, minutes: 70 },
      { hours: 30, minutes: 30 },
    ],
  ],
  [
    [
      { hours: 210, minutes: 210 },
      { hours: 250, minutes: 250 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 330, minutes: 330 },
      { hours: 290, minutes: 290 },
    ],
  ],
  [
    [
      { hours: 260, minutes: 260 },
      { hours: 265, minutes: 265 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 280, minutes: 280 },
      { hours: 275, minutes: 275 },
    ],
  ],
];
const SQUARES = [
  [
    [
      { hours: 225, minutes: 225 },
      { hours: 225, minutes: 225 },
    ],
    [
      { hours: 135, minutes: 45 },
      { hours: 135, minutes: 45 },
    ],
    [
      { hours: 315, minutes: 315 },
      { hours: 315, minutes: 315 },
    ],
  ],
  [
    [
      { hours: 225, minutes: 225 },
      { hours: 225, minutes: 225 },
    ],
    [
      { hours: 135, minutes: 45 },
      { hours: 135, minutes: 45 },
    ],
    [
      { hours: 315, minutes: 315 },
      { hours: 315, minutes: 315 },
    ],
  ],
  [
    [
      { hours: 135, minutes: 135 },
      { hours: 135, minutes: 135 },
    ],
    [
      { hours: 315, minutes: 225 },
      { hours: 315, minutes: 225 },
    ],
    [
      { hours: 45, minutes: 45 },
      { hours: 45, minutes: 45 },
    ],
  ],
  [
    [
      { hours: 135, minutes: 135 },
      { hours: 135, minutes: 135 },
    ],
    [
      { hours: 315, minutes: 225 },
      { hours: 315, minutes: 225 },
    ],
    [
      { hours: 45, minutes: 45 },
      { hours: 45, minutes: 45 },
    ],
  ],
];
const SYMMETRICAL_1 = [
  [
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
  ],
  [
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
  ],
  [
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
  ],
  [
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
  ],
];
const SYMMETRICAL_2 = [
  [
    [
      { hours: 135, minutes: 135 },
      { hours: 135, minutes: 135 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 45, minutes: 45 },
      { hours: 45, minutes: 45 },
    ],
  ],
  [
    [
      { hours: 135, minutes: 135 },
      { hours: 135, minutes: 135 },
    ],
    [
      { hours: 270, minutes: 270 },
      { hours: 270, minutes: 270 },
    ],
    [
      { hours: 45, minutes: 45 },
      { hours: 45, minutes: 45 },
    ],
  ],
  [
    [
      { hours: 235, minutes: 235 },
      { hours: 235, minutes: 235 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 315, minutes: 315 },
      { hours: 315, minutes: 315 },
    ],
  ],
  [
    [
      { hours: 235, minutes: 235 },
      { hours: 235, minutes: 235 },
    ],
    [
      { hours: 90, minutes: 90 },
      { hours: 90, minutes: 90 },
    ],
    [
      { hours: 315, minutes: 315 },
      { hours: 315, minutes: 315 },
    ],
  ],
];

const LINEAR = [OBLIQUES, WIND, DEACTIVATE];
const SYMMETRICAL = [SQUARES, SYMMETRICAL_1, SYMMETRICAL_2];

export default {
  LINEAR,
  SYMMETRICAL,
};
