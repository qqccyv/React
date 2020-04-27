import React from 'react'
import { Menu } from 'antd';
import './index.css'
import MenuConfig from '../../config/menuConfig.js'
const { SubMenu } = Menu;

export default class NavLeft extends React.Component {

  //菜单点击事件
  handleClick(e) {
    console.log('click', e);
  }
  //渲染菜单栏函数
  renderMenu(data) {
    return data.map(item => {
      if (item.children) {
        return (<SubMenu
          key={item.key}
          title={
            <span>
              <span>{item.title}</span>
            </span>
          }
        >
          {this.renderMenu(item.children)}
        </SubMenu>)
      } else {
        return <Menu.Item key={item.key}>{item.title}</Menu.Item>
      }

    })
  }
  render() {
    return (
      <div className="navleft">
        {/* logo */}
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>共享单车</h1>
        </div>
        {/* 左侧菜单部分 */}
        <Menu theme="dark" onClick={this.handleClick.bind(this)} className="menu" mode="vertical">
          {this.renderMenu(MenuConfig)}
        </Menu>
      </div>
    )
  }
}