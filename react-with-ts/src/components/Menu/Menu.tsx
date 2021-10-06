import React, { createContext, useState } from 'react';
import classnames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (slectIndex: number) => void
export interface IMenuProps {
  defaultIndex?: number,
  className?: string,
  style?: React.CSSProperties,
  mode?: MenuMode,
  onSelect?: selectCallback
}
export interface IMenuContext {
  index: number,
  onSelect?: selectCallback
}
export const MenuContext = createContext<IMenuContext>({ index: 0 })
const Menu: React.FC<IMenuProps> = (props) => {
  const { onSelect, defaultIndex,
    className,
    children,
    style,
    mode } = props;
  const [active, setActive] = useState(defaultIndex)
  const handleClick = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  // const renderChild = () => {
  //   React.Children.map(child,an)
  // }
  const classes = classnames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={{ index: active ? active : 0, onSelect: handleClick }}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0
}
export default Menu