import classnames from 'classnames';
import React, { CSSProperties, FC, memo, useCallback, useContext } from 'react';

import { ExportedMenuContext } from './Menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({
  className,
  style,
  children,
  disabled,
  index,
}: MenuItemProps): JSX.Element => {
  const context = useContext(ExportedMenuContext);
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });
  const handleClick = useCallback(() => {
    if (context.onSelect && !disabled && index) {
      context.onSelect(index);
    }
  }, [context, disabled, index]);

  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};
MenuItem.displayName = 'MenuItem';
export default memo(MenuItem);
