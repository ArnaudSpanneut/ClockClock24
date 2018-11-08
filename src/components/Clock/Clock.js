import React from 'react';
import './clock.css';

import Needle from '../Needle/Needle';

const calculateRotation = (degree) => {
  const START_DEGREE = 180;

  return START_DEGREE + degree;
};

const Clock = (props) => {
  const {
    hours,
    minutes,
    size,
    animationTime,
    defaultAnimationTime,
    animationDelay,
    animationType,
  } = props;
  const hoursDegree = calculateRotation(hours);
  const minutesDegree = calculateRotation(minutes);
  const clockSizeStyle = {
    width: size,
    height: size,
  };
  const needleTransition = {
    transitionDuration: `${animationTime || defaultAnimationTime}ms`,
    transitionDelay: `${animationDelay || 0}ms`,
    transitionTimingFunction: (animationType || 'ease'),
  };
  const needleWidth = size / 10;
  const needleHeight = size / 2;
  const style = {
    hours: {
      transform: `rotate(${hoursDegree - 360}deg)`,
      ...clockSizeStyle,
      ...needleTransition,
    },
    minutes: {
      transform: `rotate(${minutesDegree + 360}deg)`,
      ...clockSizeStyle,
      ...needleTransition,
    },
    needleRotate: {
      top: `calc(50% - ${(needleWidth / 2) - 0.5}px)`,
      left: `calc(50% - ${(needleWidth / 2) + 0.5}px)`,
    },
  };

  return (
    <div className="clock" style={clockSizeStyle}>
      <div className="clock_needle" style={style.hours}>
        <div className="clock_needleRotate" style={style.needleRotate}>
          <Needle height={needleHeight - 4} width={needleWidth} />
        </div>
      </div>
      <div className="clock_needle" style={style.minutes}>
        <div className="clock_needleRotate" style={style.needleRotate}>
          <Needle height={needleHeight} width={needleWidth} />
        </div>
      </div>
    </div>
  );
};

export default Clock;
