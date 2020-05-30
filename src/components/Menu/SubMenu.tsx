import classnames from 'classnames';
import React, {
  FunctionComponent,
  FunctionComponentElement,
  ReactNode,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
import { ExportedMenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';

interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

const SubMenu: FunctionComponent<SubMenuProps> = ({
  children,
  className,
  style,
  title,
  index,
}) => {
  const context = useContext(ExportedMenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as string[];
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false;
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(isOpened);
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': openSubMenu,
    'is-vertical': context.mode === 'vertical',
  });

  const renderChildren = useCallback(() => {
    const subMenuClasses = classnames('manu-submenu', {
      'menu-opened': openSubMenu,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      return React.cloneElement(childElement, {
        index: `${index}-${i}`,
      });
    });

    return (
      <Transition in={openSubMenu} timeout={300} animation={'zoom-in-bottom'}>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  }, [children, index, openSubMenu]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      setOpenSubMenu(!openSubMenu);
    },
    [openSubMenu]
  );
  let timer: any;
  const handleMouse = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>, toggle: boolean) => {
      clearTimeout(timer);
      event.preventDefault();
      timer = setTimeout(() => {
        setOpenSubMenu(toggle);
      }, 30);
    },
    [timer]
  );
  const clickEvents = useMemo(
    () => (context.mode === 'vertical' ? { onClick: handleClick } : {}),
    [context.mode, handleClick]
  );

  const mouseEvents = useMemo(() => {
    return context.mode === 'horizontal'
      ? {
          onMouseEnter: (
            event: React.MouseEvent<HTMLLIElement, MouseEvent>
          ): void => {
            handleMouse(event, true);
          },
          onMouseLeave: (
            event: React.MouseEvent<HTMLLIElement, MouseEvent>
          ): void => {
            handleMouse(event, false);
          },
        }
      : {};
  }, [context.mode, handleMouse]);

  return (
    <li {...mouseEvents} key={index} className={classes} style={style}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};
SubMenu.displayName = 'SubMenu';
export default memo(SubMenu);
