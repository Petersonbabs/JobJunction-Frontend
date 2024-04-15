import React, { useState } from 'react';


const Tooltip = ({ text, children, display }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{display: display}}>
      {children}
      {showTooltip && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default Tooltip;
