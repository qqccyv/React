import React, { useState, useEffect } from 'react';


const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const MouseClick = (event: MouseEvent): void => {
    setPosition({ x: event.clientX, y: event.clientY })
  }
  useEffect(() => {
    document.addEventListener('mousemove', MouseClick)
    return () => {
      document.removeEventListener('mousemove', MouseClick)
    }
  })
  return position
}

export default useMousePosition
