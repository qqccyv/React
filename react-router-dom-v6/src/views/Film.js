import React from 'react'
import { Outlet } from 'react-router'

function Film() {
  return (
    <div>
      <div style={{ width: '200px', height: "200px", background: 'yellow' }}></div>
      <Outlet></Outlet>
    </div>
  )
}

export default Film
