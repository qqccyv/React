import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import { IMenuItemProps } from './MenuItem'


type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (slectIndex: string) => void


export interface IMenuProps {
  defaultIndex?: string,
  className?: string,
  style?: React.CSSProperties,
  mode?: MenuMode,
  onSelect?: selectCallback,
  defaultOpenSubmenu?: string[]
}
export interface IMenuContext {
  index: string,
  onSelect?: selectCallback,
  mode?: MenuMode,
  defaultOpenSubmenu?: string[]
}

// 通过createContext方法创建一个可传递数据的提供者实例
export const MenuContext = createContext<IMenuContext>({ index: '0', mode: 'horizontal' })


const Menu: React.FC<IMenuProps> = (props) => {
  const { onSelect,
    defaultOpenSubmenu,
    defaultIndex,
    className,
    children,
    style,
    mode } = props;
  const [active, setActive] = useState(defaultIndex)
  const handleClick = (index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  // 通过子节点渲染函数，限制只能传入特定的子节点
  const renderChild = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 通过React.cloneElement API 将属性自动添加到子节点上面
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('有一个非“MenuItem”或者“Submenu”的节点');
      }
    })
  }
  const classes = classnames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={{ index: active ? active : '0', onSelect: handleClick, mode, defaultOpenSubmenu }}>
        {renderChild()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubmenu: []
}
export default Menu