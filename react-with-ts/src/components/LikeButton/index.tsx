import React, { useState } from 'react'
import useMousePosition from '../../hooks/useMousePosition'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  const position = useMousePosition()
  return (
    <div>
      <button onClick={() => {
        setLike(like + 1)
      }}>点赞</button>
      <br />
      <h2>{like}</h2>
      <h2>x:{position.x},y:{position.y}</h2>
      <button onClick={() => {
        setOn(!on)
      }}>{on ? 'ON' : 'OFF'}</button>
    </div>
  )
}

export default LikeButton
