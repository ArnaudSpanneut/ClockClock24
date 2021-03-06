import React from 'react';
import { Clock as ClockT } from '../../types';

import './clock.css';

import Needle from '../Needle/Needle';

const ANIMATION_START_TIMING = 'cubic-bezier(.27,0,.31,.41)';
const ANIMATION_END_TIMING = 'cubic-bezier(.9,.8,.62,.83)';
const ANIMATION_DEFAULT_TIMING = 'linear';
const ANIMATION_TIMING_CONFIG = {
  start: ANIMATION_START_TIMING,
  end: ANIMATION_END_TIMING,
};

export const Clock: React.FC<{
  size: number,
  clock: ClockT,
}> = ({
  size,
  clock,
}) => {
  const {
    hours,
    minutes,
    animationTime,
    animationDelay,
    animationType,
  } = clock;
  const clockSizeStyle = {
    width: size,
    height: size,
  };
  const transitionTime = animationTime;
  const transitionDelay = animationDelay || 0;
  const transitionTiming = animationType && ANIMATION_TIMING_CONFIG[animationType]
    ? ANIMATION_TIMING_CONFIG[animationType]
    : ANIMATION_DEFAULT_TIMING;
  const transition = `transform ${transitionTime}ms ${transitionDelay}ms ${transitionTiming}`;

  const needleWidth = size / 9;
  const needleHeight = size / 2;
  const style = {
    hours: {
      transform: `rotate(${hours}deg)`,
      ...clockSizeStyle,
      ...{ transition },
    },
    minutes: {
      transform: `rotate(${minutes}deg)`,
      ...clockSizeStyle,
      ...{ transition },
    },
    needleRotate: {
      transform: `translate(-50%, -${needleWidth / 2}px)`,
    },
  };

  return (
    <div className="clock" style={clockSizeStyle}>
      <div className="clock_needle" style={style.minutes}>
        <div className="clock_needleRotate" style={style.needleRotate}>
          <Needle height={needleHeight - 4} width={needleWidth} />
        </div>
      </div>
      <div className="clock_needle" style={style.hours}>
        <div className="clock_needleRotate" style={style.needleRotate}>
          <Needle height={needleHeight} width={needleWidth} />
        </div>
      </div>
    </div>
  );
};
