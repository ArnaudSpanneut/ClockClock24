import React from 'react';
import './needle.css';

export default class Needle extends React.Component {
  render() {
    const { height, width } = this.props;
    const style = {
      height,
      width,
      'border-radius': width,
    };

    return (
      <div className="needle" style={ style }>
      </div>
    );
  }
}
