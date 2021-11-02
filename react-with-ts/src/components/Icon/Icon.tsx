import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
export type themeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IiconProps extends FontAwesomeIconProps {
  theme?: themeProps
}
const Icon: React.FC<IiconProps> = (props) => {
  const { theme, className, icon, ...restProps } = props
  let iconClasses = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={iconClasses} icon={icon} {...restProps} />
  )
}

export default Icon
