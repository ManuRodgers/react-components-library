import classnames from 'classnames';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  /**set Button  disabled*/
  disabled: boolean;
  /**set Button size */
  size?: ButtonSize;
  /**set Button type */
  btnType: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<ButtonProps> = ({
  children,
  btnType,
  className,
  disabled,
  size,
  href,
  ...restProps
}: ButtonProps): JSX.Element => {
  const classNames = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classNames} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button disabled={disabled} className={classNames} {...restProps}>
        {children}
      </button>
    );
  }
};
Button.defaultProps = {
  btnType: 'default',
  disabled: false,
};
export default Button;
