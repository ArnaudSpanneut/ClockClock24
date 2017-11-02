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
    const { hours, minutes } = this.props;
    const minutesDivide = minutes / 5;
    const hoursDegree = this.calculateRotation(hours);
    const minutesDegree = this.calculateRotation(minutesDivide);
    const style = {
      hours: {
        transform: `rotate(${hoursDegree + 360}deg)`,
      },
      minutes: {
        transform: `rotate(${minutesDegree - 360}deg)`,
      }
    }

    return (
      <div className="clock">
        <div className="clock_needle" style={style.hours}>
          <div className="clock_needleRotate">
            <Needle height="48"/>
          </div>
        </div>
        <div className="clock_needle" style={style.minutes}>
          <div className="clock_needleRotate">
            <Needle height="50"/>
          </div>
        </div>
      </div>
    );
  }
}
