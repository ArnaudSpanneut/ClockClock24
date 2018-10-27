import React from 'react';
import './clock.css';

import Needle from '../Needle/Needle';

const calculateRotation = (number) => {
  const START_DEGREE = 180;
  const TOTAL_DEGREE = 360;
  const NB_HOURS = 12;
  const ONE_HOUR_DEGREE = TOTAL_DEGREE / NB_HOURS;

  return START_DEGREE + (ONE_HOUR_DEGREE * number);
}

const Clock = (props) => {
  const {
    hours, minutes, size, animationTime, animationDelay,
  } = props;
  const minutesDivide = minutes / 5;
  const hoursDegree = calculateRotation(hours);
  const minutesDegree = calculateRotation(minutesDivide);
  const clockSizeStyle = {
    width: size,
    height: size,
  };
  const needleTransition = {
    transitionDuration: `${animationTime}ms`,
    transitionDelay: `${animationDelay || 0}ms`,
  };
  const needleWidth = size / 11;
  const needleHeight = size / 2;
  const style = {
    hours: {
      transform: `rotate(${hoursDegree + 360}deg)`,
      ...clockSizeStyle,
      ...needleTransition,
    },
    minutes: {
      transform: `rotate(${minutesDegree - 360}deg)`,
      ...clockSizeStyle,
      ...needleTransition,
    },
    needleRotate: {
      top: `calc(50% - (${needleWidth}px / 2))`,
      left: `calc(50% - (${needleWidth}px / 2))`,
    },
  };

  return (
    <div className="clock" style={clockSizeStyle}>
      <div className="clock_needle" style={style.hours}>
        <div className="clock_needleRotate" style={style.needleRotate}>
          <Needle height={needleHeight - 2} width={needleWidth} />
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
