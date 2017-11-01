import React from 'react';
import './needle.css';

export default class Needle extends React.Component {
  render() {
    const { height } = this.props;
    const style = {
      height: `${height}px`,
    };

    return (
      <div className="needle" style={ style }>
      </div>
    );
  }
}
