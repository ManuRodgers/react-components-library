import React, { FC, ReactNode, useState } from 'react';

import Button from './components/Button/Button';
import Icon from './components/Icon/Icon';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Transition from './components/Transition/Transition';

export interface AppProps {
  children?: ReactNode;
}

const App: FC<AppProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="App">
      <Menu
        mode="horizontal"
        defaultIndex="0"
        onSelect={(index): void => {
          console.log('index: ', index);
        }}
        defaultOpenSubMenus={['3']}
      >
        <MenuItem index={'1'}>cool link 1</MenuItem>
        <MenuItem index={'2'}>cool link 2</MenuItem>
        <SubMenu title="dropdown" index="3">
          <MenuItem index={'1'}>dropdown 1</MenuItem>
          <MenuItem index={'2'}>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem index={'4'}>cool link 3</MenuItem>
      </Menu>
      <Button
        size="lg"
        onClick={() => {
          setShow(!show);
        }}
      >
        Toggle
      </Button>
      <Transition wrapper in={show} timeout={300} animation="zoom-in-left">
        <p>hello</p>
        <p>mate</p>
        <p>how</p>
        <p>you</p>
        <p>doing</p>
        <Button size="lg">Toggle</Button>
      </Transition>
    </div>
  );
};

export default App;
