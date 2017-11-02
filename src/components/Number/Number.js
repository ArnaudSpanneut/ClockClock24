import React from 'react';
import './number.css';
import Clock from './../Clock/Clock';
import NUMBERS from './numbers';

export default class Number extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: NUMBERS,
    }
  }
  getLine(lines) {
    return lines
      .map((clocks, index) => <div className="number_line" key={index}>
        { this.getClocks(clocks) }
      </div>);
  }
  getClocks(clocks) {
    const { clockSize } = this.props;

    return clocks
      .map((clock, index) => <div className="number_line_clock" key={index}>
        <Clock
          size={clockSize}
          hours={clock.hours}
          minutes={clock.minutes} />
      </div>)
  }
  render() {
    const { number } = this.props;
    const { numbers } = this.state;
    const lines = numbers[number].lines;

    return (
      <div className="number">
        { this.getLine(lines) }
      </div>
    );
  }
}
