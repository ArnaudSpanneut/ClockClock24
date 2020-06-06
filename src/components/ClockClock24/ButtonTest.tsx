import React from 'react';

/**
 * Button to launch animations
 */
const ButtonTest: React.FC<{
  onClick: () => void
}> = ({onClick}) => {
  return (
    <div
      className="clockclock24_test_button"
      onClick={() => onClick()}
    >
      <span role="img" aria-label="dance">
        💃
      </span>
    </div>
  );
}
export default ButtonTest;
