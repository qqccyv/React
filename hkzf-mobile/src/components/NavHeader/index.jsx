//封装顶部导航栏组件
import React from 'react'
import {withRouter} from 'react-router-dom'
import propTypes  from 'prop-types'
import { NavBar,Icon } from 'antd-mobile'
// import './index.scss'
import Styles from './NavHeader.module.scss'

function NavHeader({children,onLeftClick,history,className,rightContent}) {
  const defaultLeftClick = () => history.go(-1)
  return <NavBar
    className={[Styles.navBar,className || ''].join(' ')}
    mode="light"
    icon={<Icon type="left" />}
    onLeftClick={onLeftClick || defaultLeftClick}
    rightContent={rightContent}
  >{children}</NavBar>
}
NavHeader.propTypes = {
  children: propTypes.string.isRequired,
  onLeftClick: propTypes.func
}

export default withRouter(NavHeader)