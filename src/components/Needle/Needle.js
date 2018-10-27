import React from 'react';
import './needle.css';

const Needle = (props) => {
  const { height, width } = props;
  const style = {
    height,
    width,
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
  };

  return (
    <div className="needle" style={style} />
  );
}

export default Needle;
