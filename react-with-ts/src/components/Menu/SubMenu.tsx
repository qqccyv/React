import React, { useContext, useState } from 'react'
import { MenuContext } from './Menu'
import classNames from 'classnames'
import { IMenuItemProps } from './MenuItem'
interface ISubMenuProps {
  index?: string,
  title: string,
  className?: string
}
const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const passContext = useContext(MenuContext);

  const { index, title, children, className } = props;
  const defaultOpenSubmenu = passContext.defaultOpenSubmenu as Array<string>
  const isOpened = index && passContext.mode === 'vertical' && defaultOpenSubmenu.includes(index)
  const [open, setOpen] = useState(isOpened)
  // 处理点击事件的方法
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!open)
  }
  // 处理鼠标hover事件的方法
  let timer: any;
  const HandleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      e.preventDefault()
      setOpen(toggle)
    }, 300)

  }
  const verticalEventFun = passContext.mode === 'vertical' ? { onClick: handleClick } : {}
  const horizontalEventFun = passContext.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => HandleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => HandleMouse(e, false)
  } : {}
  // 渲染子节点函数
  const RenderChildrenComponent = () => {
    const ChildrenElement = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error('有一个非“MenuItem"的节点');
      }
    })
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': open
    })
    return (
      <ul className={subMenuClasses}>
        {ChildrenElement}
      </ul>
    )
  }

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': passContext.index === index
  })
  return (
    <li key={index} className={classes} {...horizontalEventFun} >
      <div className='submenu-title' {...verticalEventFun}>
        {title}
      </div>
      {RenderChildrenComponent()}
    </li>
  )
}
SubMenu.displayName = "SubMenu"
export default SubMenu