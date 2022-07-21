import React from 'react'
import { NavLink } from 'react-router-dom'
import './Tabbar.css'
function Tabbar() {
  const tabList = [
    {
      title: '电影',
      path: '/film'
    },
    {
      title: '影院',
      path: '/cenima'
    },
    {
      title: '我的',
      path: '/center'
    },
  ]
  return (
    <footer>
      <ul>
        {
          tabList.map(tabItem => {
            return (
              <li key={tabItem.path}>
                <NavLink className={(navStatus) => {
                  return navStatus.isActive ? 'dyActive' : ''
                }} to={tabItem.path}>{tabItem.title}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </footer>
  )
}

export default Tabbar