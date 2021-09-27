import classNames from 'classnames'
import React from 'react'

export enum ButtonTypes {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}
export enum ButtonSizes {
  Large = 'lg',
  Small = 'sm'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSizes;
  btnType?: ButtonTypes;
  children: React.ReactNode,
  href?: string
}


const Button: React.FC<BaseButtonProps> = (props) => {
  const { btnType, disabled, size, children, href } = props
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
  })
  if (btnType === ButtonTypes.Link) {
    return (
      <a href={href} className={classes}>{children}</a>
    )
  } else {
    return (
      <button disabled={disabled} className={classes}>{children}</button>
    )
  }

}

Button.defaultProps = {
  btnType: ButtonTypes.Default,
  disabled: false
}

export default Button
