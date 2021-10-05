import React from 'react';
import './App.css';
import Button, { ButtonSizes, ButtonTypes } from './components/Button/Button';
// import Hello from './components/Hello';
// import LikeButton from './components/LikeButton';
// import MouseTracker from './components/MouseTracker';

function App() {
  return (
    <div className="App">
      <Button size={ButtonSizes.Large} btnType={ButtonTypes.Default}>默认按钮</Button>
      <Button size={ButtonSizes.Large} btnType={ButtonTypes.Primary}>成功按钮</Button>
      <Button size={ButtonSizes.Large} btnType={ButtonTypes.Link} href="https://www.baidu.com" target="_blank">Baidu Link</Button>
    </div>
  );
}

export default App;
