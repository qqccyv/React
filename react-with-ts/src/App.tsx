import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Button, { ButtonSizes, ButtonTypes } from './components/Button/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';

// import Hello from './components/Hello';
// import LikeButton from './components/LikeButton';
// import MouseTracker from './components/MouseTracker';

function App() {

  return (
    <div className="App">
      <FontAwesomeIcon icon={faCoffee} size="10x" />
      <Menu mode="vertical" defaultOpenSubmenu={['2']} defaultIndex="0" onSelect={(index) => {
        console.log(index)
      }}>
        <MenuItem >
          111111
        </MenuItem>
        <MenuItem >
          222222
        </MenuItem>
        <SubMenu title="test">
          <MenuItem >
            111111
        </MenuItem>
          <MenuItem >
            222222
        </MenuItem>
        </SubMenu>
      </Menu>
      <Button size={ButtonSizes.Large} btnType={ButtonTypes.Default}>默认按钮</Button>
      <Button size={ButtonSizes.Large} btnType={ButtonTypes.Primary}>成功按钮</Button>
      <Button size={ButtonSizes.Large} btnType={ButtonTypes.Link} href="https://www.baidu.com" target="_blank">Baidu Link</Button>
    </div>
  );
}

export default App;
