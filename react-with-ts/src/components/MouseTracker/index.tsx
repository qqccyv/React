import React, { useState, useEffect } from 'react';
const MouseTracker: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const MouseClick = (event: MouseEvent): void => {
    console.log('11111');

    setPosition({ x: event.clientX, y: event.clientY })
  }
  useEffect(() => {
    document.addEventListener('click', MouseClick)
    return () => {
      document.removeEventListener('click', MouseClick)
    }
  })
  return (
    <div>
      <p>x:{position.x},y:{position.y}</p>
    </div>
  )
}

export default MouseTracker
