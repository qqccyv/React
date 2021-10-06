import React, { useContext } from 'react'
import classnames from 'classnames'
import { MenuContext } from './Menu'
export interface MenuItemProps {
  index: number,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const passContext = useContext(MenuContext)

  const { index,
    disabled,
    className,
    children,
    style } = props;
  const handleClick = () => {
    if (passContext.onSelect && !disabled) {
      passContext.onSelect(index)
    }
  }
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': passContext.index === index
  })
  return (
    <li onClick={handleClick} className={classes} style={style}>
      {children}
    </li>
  )
}
