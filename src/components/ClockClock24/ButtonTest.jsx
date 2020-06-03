import React from 'react';

/**
 * Button to launch animations
 */
export default function ButtonTest(onClick) {
  return (
    <button
      className="clockclock24_test_button"
      type="button"
      onClick={() => onClick()}
    >
      Dance&nbsp;
      <span role="img" aria-label="dance">
        💃
      </span>
    </button>
  );
}
