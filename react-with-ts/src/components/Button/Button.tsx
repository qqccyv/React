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
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { className, btnType, disabled, size, children, href, ...resetProps } = props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
  })
  if (btnType === ButtonTypes.Link) {
    return (
      <a {...resetProps} href={href} className={classes}>{children}</a>
    )
  } else {
    return (
      <button {...resetProps} disabled={disabled} className={classes}>{children}</button>
    )
  }

}

Button.defaultProps = {
  btnType: ButtonTypes.Default,
  disabled: false
}

export default Button
