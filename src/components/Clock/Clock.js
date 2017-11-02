import React from 'react';
import './clock.css';

import Needle from './../Needle/Needle';

export default class Clock extends React.Component {
  calculateRotation(number) {
    const START_DEGREE = 180;
    const TOTAL_DEGREE = 360;
    const NB_HOURS = 12;
    const ONE_HOUR_DEGREE = TOTAL_DEGREE / NB_HOURS;

    return START_DEGREE + (ONE_HOUR_DEGREE * number);
  }
  render() {
    const { hours, minutes, size } = this.props;
    const minutesDivide = minutes / 5;
    const hoursDegree = this.calculateRotation(hours);
    const minutesDegree = this.calculateRotation(minutesDivide);
    const clockSizeStyle = {
      width: size,
      height: size,
    };
    const needleWidth = size / 10;
    const needleHeight = size / 2;
    const style = {
      hours: Object.assign({
        transform: `rotate(${hoursDegree + 360}deg)`,
      }, clockSizeStyle),
      minutes: Object.assign({
        transform: `rotate(${minutesDegree - 360}deg)`,
      }, clockSizeStyle),
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
  }
}
