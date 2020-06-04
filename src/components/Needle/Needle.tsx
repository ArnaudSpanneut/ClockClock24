import React from 'react';
import './needle.css';

const Needle: React.FC<{
  height: number;
  width: number;
}> = ({ height, width }) => {
  const style = {
    height,
    width,
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
  };

  return <div className="needle" style={style} />;
};

export default Needle;
