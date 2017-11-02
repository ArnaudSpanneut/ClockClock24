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
    const needleSize = size / 2;
    const style = {
      hours: Object.assign({
        transform: `rotate(${hoursDegree + 360}deg)`,
      }, clockSizeStyle),
      minutes: Object.assign({
        transform: `rotate(${minutesDegree - 360}deg)`,
      }, clockSizeStyle),
    }

    return (
      <div className="clock" style={clockSizeStyle}>
        <div className="clock_needle" style={style.hours}>
          <div className="clock_needleRotate">
            <Needle height={needleSize - 2}/>
          </div>
        </div>
        <div className="clock_needle" style={style.minutes}>
          <div className="clock_needleRotate">
            <Needle height={needleSize}/>
          </div>
        </div>
      </div>
    );
  }
}
