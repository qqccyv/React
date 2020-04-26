//封装顶部导航栏组件
import React from 'react'
import {withRouter} from 'react-router-dom'
import propTypes  from 'prop-types'
import { NavBar,Icon } from 'antd-mobile'
// import './index.scss'
import Styles from './NavHeader.module.scss'

function NavHeader({children,onLeftClick,history}) {
  const defaultLeftClick = () => history.go(-1)
  return <NavBar
    className={Styles.navBar}
    mode="light"
    icon={<Icon type="left" />}
    onLeftClick={onLeftClick || defaultLeftClick}
  >{children}</NavBar>
}
NavHeader.propTypes = {
  children: propTypes.string.isRequired,
  onLeftClick: propTypes.func
}

export default withRouter(NavHeader)