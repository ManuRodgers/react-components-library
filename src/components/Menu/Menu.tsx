/* eslint-disable react/prop-types */
import classnames from 'classnames';
import React, {
  CSSProperties,
  FC,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useState,
} from 'react';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  mode?: MenuMode;
  style?: CSSProperties;
  className?: string;
  defaultIndex?: string;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
  children?: ReactNode;
}

export interface MenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const ExportedMenuContext = createContext<MenuContext>({ index: '0' });

const Menu: FC<MenuProps> = ({
  defaultIndex,
  className,
  mode,
  onSelect,
  style,
  defaultOpenSubMenus,
  children,
}) => {
  const [currentActive, setCurrentActive] = useState<string>(
    defaultIndex || '0'
  );
  const classes = classnames('manu-menu', className, {
    'menu-horizontal': mode === 'horizontal',
    'menu-vertical': mode === 'vertical',
  });
  const handleClick = useCallback(
    (index: string) => {
      setCurrentActive(index);
      onSelect && onSelect(index);
    },
    [onSelect]
  );
  const passedContext: MenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    defaultOpenSubMenus,
    mode,
  };
  return (
    <ul className={classes} style={style} data-testid={'test-menu'}>
      <ExportedMenuContext.Provider value={passedContext}>
        {children}
      </ExportedMenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default memo(Menu);
