import React from 'react';
import './needle.css';

export default class Needle extends React.Component {
  render() {
    const { height, width } = this.props;
    const style = {
      height,
      width,
      borderRadius: width,
    };

    return (
      <div className="needle" style={ style }>
      </div>
    );
  }
}
