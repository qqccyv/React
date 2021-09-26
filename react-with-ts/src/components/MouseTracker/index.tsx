import React from 'react';
import useMousePosition from '../../hooks/useMousePosition';

const MouseTracker: React.FC = () => {
  const position = useMousePosition()
  return (
    <div>
      <p>x:{position.x},y:{position.y}</p>
    </div>
  )
}

export default MouseTracker
