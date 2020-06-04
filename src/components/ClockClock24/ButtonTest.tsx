import React from 'react';

/**
 * Button to launch animations
 */
const ButtonTest: React.FC<{
  onClick: () => void
}> = ({onClick}) => {
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
export default ButtonTest;
