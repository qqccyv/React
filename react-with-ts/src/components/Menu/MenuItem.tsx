import React, { useContext } from 'react'
import classnames from 'classnames'
import { MenuContext } from './Menu'
// import Icon from '../Icon/Icon'


export interface IMenuItemProps {
  index?: string,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {

  const passContext = useContext(MenuContext)


  const { index,
    disabled,
    className,
    children,
    style } = props;
  const handleClick = () => {
    if (passContext.onSelect && !disabled && typeof index === 'string') {
      passContext.onSelect(index)
    }
  }
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': passContext.index === index,

  })
  return (
    <li key={index} onClick={handleClick} className={classes} style={style}>
      {children}
    </li>
  )

}
MenuItem.displayName = 'MenuItem'
export default MenuItem
