import React from 'react'
import { Outlet } from 'react-router'

function Film() {
  return (
    <div>
      <div style={{ width: '200px', height: "200px", background: 'yellow' }}>
        轮播图
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default Film
